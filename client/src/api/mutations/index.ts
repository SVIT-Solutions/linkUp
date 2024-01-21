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

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(token: $token) {
      success
      token
      user {
        ...User
      }
    }
  }
  ${fragment.UserFragment}
`;

export const PASSWORD_RESET_REQUEST = gql`
  mutation passwordResetRequest($email: String!) {
    passwordResetRequest(email: $email) {
      success
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token) {
      success
    }
  }
`;
