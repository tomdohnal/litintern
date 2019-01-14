import ggl from 'graphql-tag'

export const CREATE_INSTITUTION_MUTATION = ggl`
  mutation CREATE_INSTITUTION_MUTATION($title: String!, $description: String!) {
    createInstitution(title: $title, description: $description) {
      id
    }
  }
`
