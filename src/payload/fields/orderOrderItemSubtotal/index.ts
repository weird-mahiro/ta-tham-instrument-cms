import type { TextField } from 'payload'

export const orderOrderItemSubtotalField: TextField = {
  name: 'subtotal',
  type: 'text',
  required: true,
  admin: {
    width: '50%',
    readOnly: true,
    components: {
      Field: '@/payload/fields/orderOrderItemSubtotal/fieldComponent#SubtotalComponent',
    },
  },
}
