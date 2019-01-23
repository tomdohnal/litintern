import ggl from 'graphql-tag'

export const CURRENT_USER_QUERY = ggl`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      institution {
        title
        description
        interships {
          id
          title
          description
          city
          field
        }
      }
    }
  }
`
