import graphene
from graphql_jwt.shortcuts import get_token
from serious_django_graphene import FormMutation, ValidationErrors

from .schema import UserType
from .forms import AuthForm, UserRegisterForm, TokenVerificationForm

class LoginMutation(FormMutation):
    class Meta:
        form_class = AuthForm

    success = graphene.Boolean()
    token = graphene.String()
    user = graphene.Field(lambda: UserType)

    @classmethod
    def perform_mutate(cls, form, info):
        user = form.get_user()
        token = get_token(user)
        success = False
        if form.is_valid():
            success = True
        return cls(
            user=user, 
            token=token, 
            success=success,
            error=ValidationErrors(validation_errors=[])
        )


class RegisterMutation(FormMutation):
    class Meta:
        form_class = UserRegisterForm

    success = graphene.Boolean()
    token = graphene.String()
    user = graphene.Field(lambda: UserType)

    @classmethod
    def perform_mutate(cls, form, info):
        user = None
        token = None
        success = False

        if form.is_valid():
            user = form.save()
            success = True
            token = get_token(user)

        return cls(
            user=user,
            success=success, 
            token=token,
            error=ValidationErrors(validation_errors=[])
        )


class VerifyTokenMutation(FormMutation):
    class Meta:
        form_class = TokenVerificationForm

    success = graphene.Boolean()
    user = graphene.Field(UserType)

    @classmethod
    def perform_mutate(cls, form, info):
        user = info.context.user
        success = False
        if form.is_valid():
            success = True
        return cls(user=user, success=success)