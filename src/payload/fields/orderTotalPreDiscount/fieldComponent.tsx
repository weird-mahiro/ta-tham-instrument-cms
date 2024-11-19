'use client'
import { useField, FieldLabel, TextInput } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

import '../currency-field.scss'
import { VNDFormat } from '@/lib/currency-utils'

export const TotalPreDiscountComponent: TextFieldClientComponent = (props) => {
  const { path, field } = props
  const { value, setValue } = useField<string>({ path })
  return (
    <div className="field-type field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={field.label} />
        <span className="span-helper">≈ {VNDFormat(value)}</span>
      </div>
      <TextInput
        value={value}
        path={path}
        onChange={setValue}
        readOnly={Boolean(field.admin?.readOnly)}
      />
    </div>
  )
}
