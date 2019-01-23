import ggl from 'graphql-tag'

export interface Intership {
  id: number,
  title: string,
  description: string,
  field: string,
  city: string,
}

export const CREATE_INTERSHIP_MUTATION = ggl`
  mutation CREATE_INTERSHIP_MUTATION($title: String!, $description: String!, $city: String!, $field: String!) {
    createIntership(title: $title, description: $description, city: $city, field: $field) {
      id
    }
  }
`

export const INTERSHIPS_QUERY = ggl`
  query INTERSHIPS_QUERY($city: String!, $field: String!, $text: String) {
    interships(city: $city, field: $field, text: $text) {
      id
      title
      description
      city
      field
    }
  }
`

export const INTERSHIP_QUERY = ggl`
  query INTERSHIP_QUERY($id: ID!) {
    intership(id: $id) {
      id
      title
      description
      city
      field
      applications {
        id
        email
        text
      }
    }
  }
`

export const DELETE_INTERSHIP_MUTATION = ggl`
  mutation DELETE_INTERSHIP_MUTATION($id: ID!) {
    deleteIntership(id: $id) {
      id
    }
  }
`
