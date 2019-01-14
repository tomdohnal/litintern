import ggl from 'graphql-tag'
import { Box, Button, FormField, Heading, TextInput } from 'grommet'
import Router from 'next/router'
import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import useFormField from '../hooks/useFormField'

const SIGN_IN_MUTATION = ggl`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`

const SIGN_UP_MUTATION = ggl`
  mutation SIGN_UP_MUTATION($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
    }
  }
`

const Login: React.FunctionComponent = () => {
  const [email, setEmail] = useFormField()
  const [password, setPassword] = useFormField()
  const [isRegistrationForm, setIsRegistrationForm] = useState(true)

  const variables = { email: email.value, password: password.value }

  const signIn = useMutation(SIGN_IN_MUTATION, {
    variables,
  })

  const signUp = useMutation(SIGN_UP_MUTATION, {
    variables,
  })

  return (
    <>
      <Box justify="center" align="center" pad="xlarge">
        <Box elevation="xlarge" width="large" pad="large">
          <Heading level="3">
            {isRegistrationForm ? 'Registrace' : 'Přihlášení'}
          </Heading>
          <form
            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()

              let hasError = false

              if (!email.value.includes('@')) {
                hasError = true

                setEmail({ error: 'Zadej platný e-mail' })
              }

              if (!email.value) {
                hasError = true

                setEmail({ error: 'Zadej svůj e-mail' })
              }

              if (!password.value) {
                hasError = true

                setPassword({ error: 'Zadej své heslo' })
              }

              if (!hasError) {
                await (isRegistrationForm ? signUp() : signIn())

                Router.push('/dashboard')
              }
            }}
          >
            <FormField label="E-mail" error={email.error}>
              <TextInput
                placeholder="jan.novak@example.org"
                value={email.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail({ value: e.target.value })
                }}
              />
            </FormField>
            <FormField label="Heslo" error={password.error}>
              <TextInput
                type="password"
                placeholder="mujPejsek123"
                value={password.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword({ value: e.target.value })
                }}
              />
            </FormField>
            <Button
              type="submit"
              primary
              margin={{ vertical: 'medium' }}
              fill
              label={isRegistrationForm ? 'Zaregistrovat se' : 'Přihlásit se'}
            />
          </form>
          <Button
            onClick={() => {
              setIsRegistrationForm(!isRegistrationForm)
            }}
            label={isRegistrationForm ? 'Už mám účet' : 'Ještě nemám účet'}
          />
        </Box>
      </Box>
    </>
  )
}

export default Login
