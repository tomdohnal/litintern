import { Box, Button, Heading, Paragraph } from 'grommet'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { Application } from '../models/application'
import { DELETE_INTERSHIP_MUTATION, INTERSHIP_QUERY } from '../models/intership'
import { CURRENT_USER_QUERY } from '../models/user'
import AuthGuard from './AuthGuard'
import Loading from './Loading'

const IntershipDetail: React.FC<{ id: number }> = ({ id }) => {
  const { data, loading } = useQuery(INTERSHIP_QUERY, {
    suspend: false,
    variables: { id },
  })

  const deleteIntership = useMutation(DELETE_INTERSHIP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    variables: { id },
  })

  return (
    <AuthGuard>
      {loading && <Loading />}
      {!loading && data.intership && (
        <>
          <Box margin="medium">
            <Link href="/dashboard">
              <a>Zpět</a>
            </Link>
          </Box>
          <Box margin={{ horizontal: 'xlarge' }}>
            <Heading>{data.intership.title}</Heading>
            <Paragraph>
              <Button
                label="Smazat"
                onClick={async () => {
                  await deleteIntership()
                  Router.push('/dashboard')
                }}
                color="status-critical "
              />
            </Paragraph>
            <Paragraph>
              <strong>Popis: </strong>
              {data.intership.description}
            </Paragraph>
            <Paragraph>
              <strong>Město: </strong>
              {data.intership.city}
            </Paragraph>
            <Paragraph>
              <strong>Místo: </strong>
              {data.intership.field}
            </Paragraph>
            {!!data.intership.applications.length && (
              <>
                <Heading level="3">Přihlášky</Heading>
                {data.intership.applications.map((application: Application) => (
                  <Box
                    elevation="medium"
                    key={application.id}
                    margin="medium"
                    pad="medium"
                  >
                    <Paragraph>
                      <strong>E-mail: </strong>
                      {application.email}
                    </Paragraph>
                    <Paragraph>
                      <strong>Text: </strong>
                      {application.text}
                    </Paragraph>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </>
      )}
    </AuthGuard>
  )
}

export default IntershipDetail
