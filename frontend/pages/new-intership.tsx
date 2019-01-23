import {
  Box,
  Button,
  FormField,
  Heading,
  Select,
  TextArea,
  TextInput,
} from 'grommet'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { useMutation } from 'react-apollo-hooks'
import useFormField from '../hooks/useFormField'
import { CREATE_INTERSHIP_MUTATION } from '../models/intership'
import { CURRENT_USER_QUERY } from '../models/user'

const NewIntership: React.FC = () => {
  const [title, setTitle] = useFormField()
  const [description, setDescription] = useFormField()
  const [city, setCity] = useFormField()
  const [field, setField] = useFormField()
  const createIntership = useMutation(CREATE_INTERSHIP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    variables: {
      city: city.value,
      description: description.value,
      field: field.value,
      title: title.value,
    },
  })

  return (
    <>
      <Box margin="medium">
        <Link href="/dashboard">
          <a>
            <Button label="Zpět" />
          </a>
        </Link>
      </Box>
      <Box justify="center" align="center" pad="large">
        <Box elevation="xlarge" width="large" pad="large">
          <Heading level="3">Nová stáž</Heading>
          <form
            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()

              let hasError = false

              if (!title.value) {
                hasError = true

                setTitle({ error: 'Napiš název stáže' })
              }

              if (!description.value) {
                hasError = true

                setDescription({ error: 'Napiš popis stáže' })
              }

              if (!city.value) {
                hasError = true

                setCity({ error: 'Napiš město stáže' })
              }

              if (!field.value) {
                hasError = true

                setField({ error: 'Napiš obor stáže' })
              }

              if (!hasError) {
                await createIntership()

                Router.push('/dashboard')
              }
            }}
          >
            <FormField label="Název" error={title.error}>
              <TextInput
                placeholder="Rolník / horník"
                value={title.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle({ value: e.target.value })
                }}
              />
            </FormField>
            <FormField label="Popis" error={description.error}>
              <TextArea
                placeholder="Jakožto rolník by ses podílel na..."
                value={description.value}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDescription({ value: e.target.value })
                }}
                rows={8}
              />
            </FormField>
            <FormField label="Město " error={city.error}>
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
            <Button
              type="submit"
              primary
              margin={{ vertical: 'medium' }}
              fill
              label="Vytvořit stáž"
            />
          </form>
        </Box>
      </Box>
    </>
  )
}

export default NewIntership
