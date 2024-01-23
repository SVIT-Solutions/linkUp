import graphene

from django.shortcuts import get_object_or_404
from graphene_django.types import DjangoObjectType

from .models import User


class UserType(DjangoObjectType):
    avatar_url = graphene.String()

    class Meta:
        model = User

    def resolve_avatar_url(self, info):
        return self.userprofile.avatar.url if self.userprofile and self.userprofile.avatar else None


class Query:
    user = graphene.Field(UserType, id=graphene.ID())

    def resolve_user(self, info, id):
        return get_object_or_404(User, id=id)
