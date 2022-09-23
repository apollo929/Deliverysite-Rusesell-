import { gql } from 'apollo-angular';
export const LOGIN = gql`
mutation Login($input: LoginInput!) {
  login(input: $input) {
    success: Success!
  }
}
`;
