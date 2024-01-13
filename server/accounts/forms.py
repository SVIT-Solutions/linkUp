from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .models import User


class AuthForm(AuthenticationForm):
    def confirm_login_allowed(self, user):
        if not user.is_active:
            raise forms.ValidationError(
                'There was a problem with your login.', code='invalid_login')



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