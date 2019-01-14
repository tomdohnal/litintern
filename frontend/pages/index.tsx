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
import React from 'react'
import styled from 'styled-components'
import useFormField from '../hooks/useFormField'

const FormInputs = styled.div`
  display: flex;
  flex-direction: row;
`

const Form = styled.form`
  transform: translateY(-50%);
`

const Index: React.FunctionComponent = () => {
  const [city, setCity] = useFormField()
  const [field, setField] = useFormField() // the field means the field of the intership not the field as the form field
  const [text, setText] = useFormField()

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
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
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
                <Select
                  options={['Praha', 'Brno']}
                  placeholder="Jaké město?"
                  value={city.value}
                  // @ts-ignore: the type definitions are wrong for this event handler
                  onChange={(e: { value: string }) => {
                    setCity({ value: e.value })
                  }}
                />
              </FormField>
            </Box>
            <Box pad="medium">
              <FormField label="Obor" error={city.error}>
                <Select
                  options={['Hardware', 'Software', 'Zemědělství']}
                  placeholder="Jaký obor?"
                  value={field.value}
                  // @ts-ignore: the type definitions are wrong for this event handler
                  onChange={(e: { value: string }) => {
                    setField({ value: e.value })
                  }}
                />
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
    </>
  )
}

export default Index
