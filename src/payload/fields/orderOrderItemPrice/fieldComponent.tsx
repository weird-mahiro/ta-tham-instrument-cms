'use client'
import { useEffect, useState } from 'react'
import { useField, FieldLabel, TextInput, useForm, Button } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

import '../currency-field.scss'
import { VNDFormat } from '@/lib/currency-utils'

export const PriceComponent: TextFieldClientComponent = (props) => {
  const { path, field } = props
  const [currentPrice, setCurrentPrice] = useState('')
  const { value, setValue } = useField<string>({ path })
  const { getSiblingData } = useForm()
  const siblingData = getSiblingData(path)
  const handleCopy = () => {
    setValue(currentPrice)
  }

  useEffect(() => {
    const handleCurrentPrice = async () => {
      if (!siblingData.product) {
        return
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${siblingData.product}`,
      )
      const data = await res.json()
      setCurrentPrice(data.price)
    }

    handleCurrentPrice()
  }, [siblingData.product])
  return (
    <div className="field-type field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={field.label} />
        <span className="span-helper">
          Input: {VNDFormat(value)} --- Current: {VNDFormat(currentPrice)}
        </span>
      </div>
      <TextInput value={value} path={path} onChange={setValue} />
      <Button className="copy-btn" onClick={handleCopy}>
        Copy Price
      </Button>
    </div>
  )
}
