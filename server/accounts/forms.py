from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate
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
                _('Account is not active. Please confirm your account and log in again.'),
                code='invalid_login')

    def clean(self):
        email = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if email and password:
            self.user_cache = authenticate(self.request, username=email, password=password)
            self.confirm_login_allowed(self.user_cache)

            if self.user_cache is not None:
                self.cleaned_data['username'] = self.user_cache.username
            else:
                self.add_error('__all__', forms.ValidationError(
                    _('Please enter your correct email address and password.'),
                    code='invalid_login',
                    params={'field': '__all__'}
                ))
        elif email and not password:
            raise forms.ValidationError(
                _('Please enter your password.'),
                code='invalid_login',
                params={'field': 'password'})
        elif password and not email:
            self.add_error('username', forms.ValidationError(
                _('Please enter your email address.'),
                code='invalid_login',
                params={'field': 'username'}
            ))
        else:
            self.add_error('__all__', forms.ValidationError(
                _('Please enter your correct email address and password.'),
                code='invalid_login',
                params={'field': '__all__'}
            ))



class UserRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email', 'username', 'password1', 'password2', )

    def save(self, commit=True):
        user = super(UserRegisterForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])

        if commit:
            user.save()
        return user


class TokenVerificationForm(forms.Form):
    token = forms.CharField(max_length=255)