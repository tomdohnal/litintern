import ggl from 'graphql-tag'

export const CREATE_APPLICATION_MUTATION = ggl`
  mutation CREATE_APPLICATION_MUTATION($email: String!, $text: String!, $intershipId: ID!) {
    createApplication(email: $email, text: $text, intershipId: $intershipId) {
      id
    }
  }
`
