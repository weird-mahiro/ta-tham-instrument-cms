import type { TextField } from 'payload'

export const orderGrandTotalField: TextField = {
  name: 'grandTotal',
  type: 'text',
  admin: {
    readOnly: true,
    components: {
      Field: {
        path: '@/payload/fields/orderGrandTotal/fieldComponent#GrandTotalComponent',
      },
      Cell: {
        path: '@/payload/fields/orderGrandTotal/cellComponent#GrandTotalComponent',
      },
    },
  },
}
