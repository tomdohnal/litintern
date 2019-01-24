import { Paragraph } from 'grommet'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Loading: React.FC = () => (
  <Container>
    <Paragraph>Načítání...</Paragraph>
  </Container>
)

export default Loading
