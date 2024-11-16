'use client'
import { Button, useForm, useFormFields } from '@payloadcms/ui'
import { FieldClientComponent } from 'payload'

export const CopyBillingAddressComponent: FieldClientComponent = (props) => {
  const dispatchFormAction = useFormFields(([_, dispatch]) => dispatch)
  const { getData } = useForm()
  const handleCopy = () => {
    const data = getData()
    dispatchFormAction({
      type: 'UPDATE',
      path: 'shippingAddress.fullName',
      value: data.billingAddress.fullName,
    })
    dispatchFormAction({
      type: 'UPDATE',
      path: 'shippingAddress.phoneNumber',
      value: data.billingAddress.phoneNumber,
    })
    dispatchFormAction({
      type: 'UPDATE',
      path: 'shippingAddress.addressLine1',
      value: data.billingAddress.addressLine1,
    })
    dispatchFormAction({
      type: 'UPDATE',
      path: 'shippingAddress.addressLine2',
      value: data.billingAddress.addressLine2,
    })
    dispatchFormAction({
      type: 'UPDATE',
      path: 'shippingAddress.district',
      value: data.billingAddress.district,
    })
    dispatchFormAction({
      type: 'UPDATE',
      path: 'shippingAddress.province',
      value: data.billingAddress.province,
    })
    dispatchFormAction({
      type: 'UPDATE',
      path: 'shippingAddress.country',
      value: data.billingAddress.country,
    })
  }
  return <Button onClick={handleCopy}>Copy Billing Address</Button>
}
