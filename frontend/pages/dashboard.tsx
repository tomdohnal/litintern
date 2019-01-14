import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import AuthGuard from '../components/AuthGuard'
import CreateInstitutionForm from '../components/CreateInstitutionForm'
import InstitutionDashboard from '../components/InstitutionDashboard'
import Loading from '../components/Loading'
import { CURRENT_USER_QUERY } from '../models/user'

const Dashboard: React.FunctionComponent = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY, { suspend: false })

  return (
    <AuthGuard>
      {loading && <Loading />}
      {!loading && !data.currentUser.institution && <CreateInstitutionForm />}
      {!loading && data.currentUser.institution && <InstitutionDashboard />}
    </AuthGuard>
  )
}

export default Dashboard
