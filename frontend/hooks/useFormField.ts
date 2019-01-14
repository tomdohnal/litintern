import { useState } from 'react'

interface IFieldOverrides {
  value?: string
  error?: string
}

interface IField {
  value: string
  error: string
}

const useFormField = (): [
  IField,
  (fieldOverrides: IFieldOverrides) => void
] => {
  const [field, setField] = useState({ value: '', error: '' })

  return [
    field,
    (fieldOverrides: IFieldOverrides) => {
      setField({ ...{ value: '', error: '' }, ...fieldOverrides })
    },
  ]
}

export default useFormField
