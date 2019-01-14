import { Box, Button, FormField, Heading, TextArea, TextInput } from 'grommet'
import React from 'react'
import { useMutation } from 'react-apollo-hooks'
import useFormField from '../hooks/useFormField'
import { CREATE_INSTITUTION_MUTATION } from '../models/institution'
import { CURRENT_USER_QUERY } from '../models/user'

const CreateInstitutionForm: React.FC = () => {
  const [title, setTitle] = useFormField()
  const [description, setDescription] = useFormField()
  const createInstitution = useMutation(CREATE_INSTITUTION_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    variables: { title: title.value, description: description.value },
  })

  return (
    <Box justify="center" align="center" pad="large">
      <Box elevation="xlarge" width="large" pad="large">
        <Heading level="3">Nová instituce</Heading>
        <form
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            let hasError = false

            if (!title.value) {
              hasError = true

              setTitle({ error: 'Napiš název instituce' })
            }

            if (!description.value) {
              hasError = true

              setDescription({ error: 'Napiš popis instituce' })
            }

            if (!hasError) {
              createInstitution()
            }
          }}
        >
          <FormField label="Název" error={title.error}>
            <TextInput
              placeholder="Seznam.cz, a.s."
              value={title.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle({ value: e.target.value })
              }}
            />
          </FormField>
          <FormField label="Popis" error={description.error}>
            <TextArea
              placeholder="Seznam.cz je český internetový portál a vyhledávač. Byl založen roku 1996 Ivem Lukačovičem a posléze se stal jedním z prvních českých internetových katalogů a vyhledávačů v České republice. Má sídlo v Praze na Smíchově, další kanceláře také v Brně a Ostravě."
              value={description.value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescription({ value: e.target.value })
              }}
              rows={8}
            />
          </FormField>
          <Button
            type="submit"
            primary
            margin={{ vertical: 'medium' }}
            fill
            label="Založit instituci"
          />
        </form>
      </Box>
    </Box>
  )
}

export default CreateInstitutionForm
