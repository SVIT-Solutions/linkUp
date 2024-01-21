import graphene
from graphql_jwt.shortcuts import get_token
from serious_django_graphene import FormMutation, ValidationErrors

from .schema import UserType
from .forms import AuthForm, UserRegisterForm, TokenVerificationForm, PasswordResetRequestForm, ResetPasswordForm
from .models import User

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

    @classmethod
    def perform_mutate(cls, form, info):
        success = False

        if form.is_valid():
            form.save()
            success = True

        return cls(
            success=success, 
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


class VerifyEmailMutation(graphene.Mutation):
    class Arguments:
        token = graphene.String(required=True)

    success = graphene.Boolean()
    user = graphene.Field(UserType)
    token = graphene.String()

    @classmethod
    def mutate(cls, root, info, token):
        user = None
        access_token = None 

        try:
            user = User.objects.get(verification_token=token, is_active=False)
            user.is_active = True
            user.verification_token = None
            user.save()
            access_token = get_token(user)
            success = True
        except User.DoesNotExist:
            success = False

        return cls(user=user, success=success, token=access_token)


class PasswordResetRequestMutation(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, email):
        form = PasswordResetRequestForm({'email': email})
        success = form.process()
        return cls(success=success)


class ResetPasswordMutation(graphene.Mutation):
    class Arguments:
        password = graphene.String(required=True)
        token = graphene.String(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, password, token):
        form = ResetPasswordForm({'password': password, 'token': token})
        success = form.process()
        return cls(success=success)