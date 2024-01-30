from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate
from .tasks import send_activation_email, send_password_reset_email
from .models import User


class AuthForm(AuthenticationForm):
    username = forms.CharField(
        label=_("Username"),
        widget=forms.TextInput(attrs={'autofocus': True}),
        required=False
    )
    password = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'current-password'}),
        required=False
    )
    
    def confirm_login_allowed(self, user):
        if user is not None and not user.is_active:
            raise forms.ValidationError(
                _('Account is not active. Please confirm your account.'),
                code='invalid_login'
            )

    def clean(self):
        email = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if email and password:
            try:
                user = User.objects.get(email=email)
                self.confirm_login_allowed(user)
            except User.DoesNotExist:
                self.add_error('__all__', forms.ValidationError(
                    _('Please enter your correct email address and password.'),
                    code='invalid_login',
                ))
                return
            except forms.ValidationError as e:
                self.add_error('__all__', e)
                return


            self.user_cache = authenticate(self.request, username=email, password=password)

            if self.user_cache is not None:
                self.cleaned_data['username'] = self.user_cache.username
            else:
                self.add_error('__all__', forms.ValidationError(
                    _('Please enter your correct email address and password.'),
                    code='invalid_login',
                ))
        elif email and not password:
             self.add_error('password', forms.ValidationError(
                _('Please enter your password.'),
                code='invalid_login',
              ))
        elif password and not email:
            self.add_error('username', forms.ValidationError(
                _('Please enter your email address.'),
                code='invalid_login',
            ))
        else:
            self.add_error('__all__', forms.ValidationError(
                _('Please enter your correct email address and password.'),
                code='invalid_login',
            ))



class UserRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email', 'username', 'password1', 'password2', )

    def save(self, commit=True):
        user = super(UserRegisterForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])

        if commit:
            user.is_active = False
            user.save()
            send_activation_email.delay(user.id)

        return user


class TokenVerificationForm(forms.Form):
    token = forms.CharField(max_length=255, required=True)


class PasswordResetRequestForm(forms.Form):
    email = forms.EmailField(required=True)
    
    def process(self):
        success = False
        if self.is_valid():
            try:
                user = User.objects.get(email=self.cleaned_data['email'])
                send_password_reset_email.delay(user.id)
                success = True
            except User.DoesNotExist:
                success = True
        return success

class ResetPasswordForm(forms.Form):
    password = forms.CharField(max_length=128, required=True)
    token = forms.CharField(max_length=255, required=True)
    
    def process(self):
        success = False
        if self.is_valid():
            try:
                user = User.objects.get(password_change_token=self.cleaned_data['token'])
                user.set_password(self.cleaned_data['password'])
                user.password_change_token = None 
                user.save()
                success = True
            except User.DoesNotExist:
                success = False
        return success