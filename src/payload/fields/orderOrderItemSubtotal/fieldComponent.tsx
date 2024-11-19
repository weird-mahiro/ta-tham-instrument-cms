'use client'
import { useEffect } from 'react'
import { useField, FieldLabel, TextInput, useForm, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

import '../currency-field.scss'
import { VNDFormat } from '@/lib/currency-utils'

export const SubtotalComponent: TextFieldClientComponent = (props) => {
  const { path, field } = props
  const { value, setValue } = useField<string>({ path })
  const dispatchFormAction = useFormFields(([fields, dispatch]) => dispatch)
  const { getSiblingData, getData } = useForm()
  const siblingData = getSiblingData(path)

  // This is to handle subtotal
  useEffect(() => {
    const data = (Number(siblingData.price) * siblingData.quantity).toString()
    if (siblingData.subtotal == data) {
      return
    }
    setValue(data)
  }, [siblingData.price, siblingData.quantity, setValue, siblingData.subtotal])
  // This is to handle totalPreDiscount
  useEffect(() => {
    const data = getData()
    const orderItems = data.orderItems
    let totalPreDiscount: number = 0
    if (orderItems && orderItems.length > 0) {
      totalPreDiscount = orderItems.reduce((acc: number, item: any) => {
        return (acc += Number(item.subtotal))
      }, 0)
    }

    if (totalPreDiscount == data.totalPreDiscount) {
      return
    }
    dispatchFormAction({
      type: 'UPDATE',
      path: 'totalPreDiscount',
      value: totalPreDiscount.toString(),
    })
  }, [siblingData.subtotal, dispatchFormAction, getData])
  return (
    <div className="field-type field-component" style={{ width: field.admin?.width }}>
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
