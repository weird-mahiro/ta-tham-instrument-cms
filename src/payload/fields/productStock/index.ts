import type { Field } from 'payload'

export const StockUIField: Field = {
  name: 'stockNumber',
  type: 'ui',
  admin: {
    components: {
      Field: '@/payload/fields/productStock/uiComponent#StockComponent',
    },
  },
}
