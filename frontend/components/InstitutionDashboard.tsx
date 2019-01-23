import { Box, Button, Heading, Paragraph } from 'grommet'
import Link from 'next/link'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import Loading from '../components/Loading'
import { Intership } from '../models/intership'
import { CURRENT_USER_QUERY } from '../models/user'

const IntershipLink = styled.a`
  color: unset;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`

const InstitutionDashboard: React.FC = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY, { suspend: false })

  if (loading) {
    return <Loading />
  }
  const { interships } = data.currentUser.institution

  return (
    <Box pad="medium">
      <Box alignSelf="end">
        <Link href="/new-intership">
          <a>Nová stáž</a>
        </Link>
      </Box>
      <Box pad="large">
        {interships.length ? (
          <>
            <Heading>Moje inzerované stáže:</Heading>
            {interships.map((intership: Intership) => {
              return (
                <Box key={intership.id} margin={{ bottom: 'medium' }}>
                  <Heading level="3">
                    <Link
                      href={{
                        pathname: '/intership',
                        query: { id: intership.id },
                      }}
                    >
                      <IntershipLink>{intership.title}</IntershipLink>
                    </Link>
                  </Heading>
                  <Paragraph>
                    <strong>Město: </strong>
                    {intership.city}
                  </Paragraph>
                  <Paragraph>
                    <strong>Obor: </strong>
                    {intership.field}
                  </Paragraph>
                </Box>
              )
            })}
          </>
        ) : (
          <Heading>Zatím tu nejsou žádné stáže</Heading>
        )}
      </Box>
    </Box>
  )
}

export default InstitutionDashboard
