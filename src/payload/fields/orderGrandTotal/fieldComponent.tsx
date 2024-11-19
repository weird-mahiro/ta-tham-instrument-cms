'use client'
import { useEffect } from 'react'
import { useField, FieldLabel, TextInput, useForm } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

import '../currency-field.scss'
import { VNDFormat } from '@/lib/currency-utils'

export const GrandTotalComponent: TextFieldClientComponent = (props) => {
  const { path, field } = props
  const { value, setValue } = useField<string>({ path })
  const { getSiblingData } = useForm()
  const siblingData = getSiblingData(path)
  useEffect(() => {
    const grandTotal = (
      Number(siblingData.totalPreDiscount) - Number(siblingData.totalDiscount)
    ).toString()
    if (grandTotal == siblingData.grandTotal) {
      return
    }
    setValue(grandTotal)
  }, [siblingData.totalPreDiscount, siblingData.totalDiscount, siblingData.grandTotal, setValue])
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
