'use client'
import { useEffect } from 'react'
import { useField, FieldLabel, TextInput, useForm } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

import '../currency-field.scss'
import { VNDFormat } from '@/lib/currency'

export const TotalDiscountComponent: TextFieldClientComponent = (props) => {
  const { path, field } = props
  const { value, setValue } = useField<string>({ path })
  const { getSiblingData } = useForm()
  const siblingData = getSiblingData(path)
  useEffect(() => {
    if (!siblingData.totalPreDiscount) {
      return
    }
    let totalDiscount = 0
    if (!siblingData.discountType || !siblingData.discountNumber) {
      totalDiscount = 0
    } else if (siblingData.discountType === 'percentage') {
      totalDiscount = siblingData.totalPreDiscount * (siblingData.discountNumber / 100)
    } else {
      totalDiscount = siblingData.discountNumber
    }
    if (totalDiscount == siblingData.totalDiscount) {
      return
    }
    setValue(totalDiscount.toString())
  }, [
    siblingData.totalPreDiscount,
    siblingData.discountType,
    siblingData.discountNumber,
    siblingData.totalDiscount,
    setValue,
  ])
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
