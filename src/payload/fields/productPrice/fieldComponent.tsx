'use client'
import { useField, FieldLabel, TextInput } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

import '../currency-field.scss'
import { VNDFormat } from '@/utils/currency'

export const PriceComponent: TextFieldClientComponent = (props) => {
  const { path, field } = props
  const { value, setValue } = useField<string>({ path })

  return (
    <div className="field-type field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={field.label} />
        <span className="span-helper">≈ {VNDFormat(value)}</span>
      </div>
      <TextInput value={value} path={path} onChange={setValue} />
    </div>
  )
}