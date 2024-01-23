import gql from 'graphql-tag';

export const UserFragment = gql`
  fragment User on UserType {
    id
    email
    username
    avatarUrl
  }
`;
