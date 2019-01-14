import Router from 'next/router'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { CURRENT_USER_QUERY } from '../models/user'
import Loading from './Loading'

const AuthGuard: React.FC = ({ children }) => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY, { suspend: false })

  if (loading) {
    return <Loading />
  }

  if (!data.currentUser) {
    Router.push('/login')
  }

  return <>{children}</>
}

export default AuthGuard
