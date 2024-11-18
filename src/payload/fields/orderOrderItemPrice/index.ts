import { validatePriceString } from '@/lib/currency'
import type { TextField } from 'payload'

// Not required since will validate the price based on role
export const orderOrderItemPriceField: TextField = {
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
      Field: '@/payload/fields/orderOrderItemPrice/fieldComponent#PriceComponent',
    },
  },
  hooks: {
    beforeChange: [
      async ({ value, req: { user, payload }, siblingData }) => {
        if (!user || !(user.roles?.includes('order.write') || user.roles?.includes('admin.all'))) {
          const res = await payload.findByID({
            collection: 'products',
            id: siblingData.product,
          })
          return res.price
        }
        return value
      },
    ],
  },
}
