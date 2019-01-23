import {
  Box,
  Button,
  FormField,
  Heading,
  Paragraph,
  Select,
  Text,
  TextInput,
} from 'grommet'
import Link from 'next/link'
import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import styled from 'styled-components'
import IntershipApplication from '../components/IntershipApplication'
import useFormField from '../hooks/useFormField'
import { Intership, INTERSHIPS_QUERY } from '../models/intership'

const FormInputs = styled.div`
  display: flex;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const Form = styled.form`
  transform: translateY(-50%);
`

const Index: React.FunctionComponent = () => {
  const [city, setCity] = useFormField()
  const [field, setField] = useFormField() // the field means the field of the intership not the field as the form field
  const [text, setText] = useFormField()
  const [interships, setInterships] = useState<[Intership] | null>(null)
  const client = useApolloClient()

  return (
    <>
      <Box
        pad={{ horizontal: 'large', top: 'large', bottom: '180px' }}
        background="brand"
        align="center"
        style={{ zIndex: 1 }}
      >
        <Box alignSelf="end">
          <Link href="/login">
            <a>
              <Text color="light-1">Přihlásit / zaregistrovat se</Text>
            </a>
          </Link>
        </Box>
        <Box width="large">
          <Heading size="large" level="1" margin="none">
            Lit Intern
          </Heading>
          <Paragraph style={{ maxWidth: '800px' }}>
            Najdi si stáž, kde budeš moct uplatnit své dovednosti a získat praxi
          </Paragraph>
        </Box>
      </Box>
      <Form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()

          let hasError = false

          if (!city.value) {
            hasError = true

            setCity({ error: 'Vyber si město' })
          }

          if (!field.value) {
            hasError = true

            setField({ error: 'Vyber si obor' })
          }

          if (!hasError && client) {
            const result = await client.query<{ interships: [Intership] }>({
              query: INTERSHIPS_QUERY,
              variables: {
                city: city.value,
                field: field.value,
                text: text.value,
              },
            })

            setInterships(result.data.interships)
          }
        }}
      >
        <Box
          align="center"
          justify="center"
          elevation="xlarge"
          pad="medium"
          border="all"
          margin={{
            horizontal: 'xlarge',
          }}
          background="light-1"
        >
          <Heading level="3" margin="none">
            Vyhledávání
          </Heading>
          <FormInputs>
            <Box pad="medium">
              <FormField label="Město" error={city.error}>
                {/* <Select
                  options={['Praha', 'Brno']}
                  placeholder="Jaké město?"
                  value={city.value}
                  // @ts-ignore: the type definitions are wrong for this event handler
                  onChange={(e: { value: string }) => {
                    setCity({ value: e.value })
                  }}
                /> */}
                <select
                  value={city.value}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setCity({ value: e.target.value })
                  }}
                >
                  <option value="">Vyber si město</option>
                  {['Praha', 'Brno'].map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </FormField>
            </Box>
            <Box pad="medium">
              <FormField label="Obor" error={field.error}>
                {/* <Select
                  options={['Hardware', 'Software', 'Zemědělství']}
                  placeholder="Jaký obor?"
                  value={field.value}
                  // @ts-ignore: the type definitions are wrong for this event handler
                  onChange={(e: { value: string }) => {
                    setField({ value: e.value })
                  }}
                /> */}
                <select
                  value={field.value}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setField({ value: e.target.value })
                  }}
                >
                  <option value="">Vyber si obor</option>
                  {['Hardware', 'Software', 'Zemědělství'].map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </FormField>
            </Box>
            <Box pad="medium" flex="grow">
              <FormField label="Text (nepovinné)">
                <TextInput
                  placeholder="Další detaily..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setText({ value: e.target.value })
                  }}
                  value={text.value}
                />
              </FormField>
            </Box>
          </FormInputs>
          <Button primary={true} label="Hledat" type="submit" />
        </Box>
      </Form>
      {interships && !interships.length && (
        <Box pad={{ horizontal: 'large' }} margin={{ bottom: 'large' }}>
          <Heading level="3">Žádná stáž nenalezena</Heading>
        </Box>
      )}
      {interships && !!interships.length && (
        <Box pad={{ horizontal: 'large' }} margin={{ bottom: 'large' }}>
          <Heading level="3">Výsledky hledání:</Heading>
          {interships.map(intership => (
            <IntershipApplication key={intership.id} intership={intership} />
          ))}
        </Box>
      )}
    </>
  )
}

export default Index
