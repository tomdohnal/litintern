import {
  Box,
  Button,
  FormField,
  Heading,
  Paragraph,
  TextArea,
  TextInput,
} from 'grommet'
import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import useFormField from '../hooks/useFormField'
import { CREATE_APPLICATION_MUTATION } from '../models/application'
import { Intership } from '../models/intership'

interface IProps {
  intership: Intership
}

const IntershipApplication: React.FC<IProps> = ({ intership }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [successText, setSuccessText] = useState('')
  const [email, setEmail] = useFormField()
  const [text, setText] = useFormField()
  const createApplication = useMutation(CREATE_APPLICATION_MUTATION, {
    variables: {
      email: email.value,
      intershipId: intership.id,
      text: text.value,
    },
  })

  return (
    <Box
      elevation="small"
      key={intership.id}
      margin={{ bottom: 'large' }}
      pad="medium"
    >
      <Heading level="3">{intership.title}</Heading>
      <Paragraph>
        <strong>Popis: </strong>
        {intership.description}
      </Paragraph>
      <Paragraph>
        <strong>Obor: </strong>
        {intership.field}
      </Paragraph>
      <Paragraph>
        <strong>Město: </strong>
        {intership.city}
      </Paragraph>
      {!isFormOpen && (
        <Box justify="center" align="center">
          <Button
            onClick={() => {
              setIsFormOpen(true)
            }}
            label="Odpovědět"
          />
        </Box>
      )}
      {isFormOpen && (
        <>
          <Heading level="3">Moje odpověď:</Heading>
          <form
            onSubmit={async e => {
              e.preventDefault()

              let hasError = false

              if (!email.value.includes('@')) {
                hasError = true

                setEmail({ error: 'Napiš správný e-mail' })
              }

              if (!email.value) {
                hasError = true

                setEmail({ error: 'Napiš svůj e-mail' })
              }

              if (!text.value) {
                hasError = true

                setText({ error: 'Napiš proč bys chtěl tuto stáž' })
              }

              if (!hasError) {
                await createApplication()
                setSuccessText('Žádost byla odeslána')
                setIsFormOpen(false)
              }
            }}
          >
            <FormField label="E-mail" error={email.error}>
              <TextInput
                placeholder="honza@pepa.cz"
                value={email.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail({ value: e.target.value })
                }}
              />
            </FormField>
            <FormField label="Text" error={text.error}>
              <TextArea
                placeholder="Proč bys chtět tuto stáž?"
                value={text.value}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setText({ value: e.target.value })
                }}
                rows={10}
              />
            </FormField>
            <Button type="submit" label="Odeslat" />
          </form>
        </>
      )}
      <Paragraph color="status-ok">{successText}</Paragraph>
    </Box>
  )
}

export default IntershipApplication
