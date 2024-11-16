import type { Field } from 'payload'

export const CopyBillingAddressUiField: Field = {
  name: 'copyBillingAddress',
  type: 'ui',
  admin: {
    components: {
      Field: '@/payload/fields/orderCopyBillingAddress/uiComponent#CopyBillingAddressComponent',
    },
  },
}
