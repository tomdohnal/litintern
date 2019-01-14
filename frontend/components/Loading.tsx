import { Box, Paragraph } from 'grommet'
import React from 'react'

const Loading: React.FC = () => (
  <Box style={{ height: '100vh' }} align="center" justify="center">
    <Paragraph>Načítání...</Paragraph>
  </Box>
)

export default Loading
