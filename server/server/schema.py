import graphene
import graphql_jwt

import accounts.mutations as ac_mutation

from accounts.schema import Query as AccountsQuery


class Query(AccountsQuery, graphene.ObjectType):pass

class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    login = ac_mutation.LoginMutation.Field()
    register = ac_mutation.RegisterMutation.Field()
    verify_token = ac_mutation.VerifyTokenMutation.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    verify_email = ac_mutation.VerifyEmailMutation.Field()
    password_reset_request = ac_mutation.PasswordResetRequestMutation.Field()
    reset_password = ac_mutation.ResetPasswordMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)