import gql from 'graphql-tag';
import * as fragment from 'api/fragments/index';

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      token
      user {
        ...User
      }
      error {
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
    }
  }
  ${fragment.UserFragment}
`;

export const REGISTER = gql`
  mutation register(
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
    ) {
      success
      token
      user {
        ...User
      }
      error {
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
    }
  }
  ${fragment.UserFragment}
`;

export const VERIFY_TOKEN = gql`
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      success
      user {
        ...User
      }
    }
  }
  ${fragment.UserFragment}
`;
