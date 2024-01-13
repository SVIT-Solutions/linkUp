import graphene

from django.shortcuts import get_object_or_404
from graphene_django.types import DjangoObjectType

from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query:
    user = graphene.Field(UserType, id=graphene.ID())

    def resolve_user(self, info, id):
        return get_object_or_404(User, id=id)
