import type { TextField } from 'payload'

export const orderTotalPreDiscountField: TextField = {
  name: 'totalPreDiscount',
  type: 'text',
  admin: {
    readOnly: true,
    components: {
      Field: {
        path: '@/payload/fields/orderTotalPreDiscount/fieldComponent#TotalPreDiscountComponent',
      },
      Cell: {
        path: '@/payload/fields/orderTotalPreDiscount/cellComponent#TotalPreDiscountComponent',
      },
    },
  },
}
