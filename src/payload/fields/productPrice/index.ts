import { validatePriceString } from '@/lib/currency-utils'
import type { TextField } from 'payload'

export const productPriceField: TextField = {
  name: 'price',
  type: 'text',
  validate: async (val: any) => {
    if (!validatePriceString(val)) {
      return 'Product price is invalid!'
    }
    return true
  },
  admin: {
    components: {
      Field: '@/payload/fields/productPrice/fieldComponent#PriceComponent',
      Cell: '@/payload/fields/productPrice/cellComponent#PriceComponent',
    },
  },
}
