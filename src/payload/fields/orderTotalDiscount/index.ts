import type { TextField } from 'payload'

export const orderTotalDiscountField: TextField = {
  name: 'totalDiscount',
  type: 'text',
  admin: {
    readOnly: true,
    components: {
      Field: {
        path: '@/payload/fields/orderTotalDiscount/fieldComponent#TotalDiscountComponent',
      },
      Cell: {
        path: '@/payload/fields/orderTotalDiscount/cellComponent#TotalDiscountComponent',
      },
    },
  },
}
