import type { CollectionConfig } from 'payload'
import { isAnyone } from '../access/isAnyone'
import { isAdminOrOrderRead } from '../access/isAdminOrOrderRead'
import { isAdminOrOrderWrite, isAdminOrOrderWriteFieldLevel } from '../access/isAdminOrOrderWrite'
import { orderOrderItemPriceField } from '../fields/orderOrderItemPrice'
import { orderOrderItemSubtotalField } from '../fields/orderOrderItemSubtotal'
import { orderTotalPreDiscountField } from '../fields/orderTotalPreDiscount'
import { orderTotalDiscountField } from '../fields/orderTotalDiscount'
import { orderGrandTotalField } from '../fields/orderGrandTotal'
import { CopyBillingAddressUiField } from '../fields/orderCopyBillingAddress'

const MIN_DISCOUNT_NUMBER = 0

const MAX_DISCOUNT_PERCENTAGE = 0

const MAX_CUSTOMER_NOTES = 500

const statusOptions = [
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Processing',
    value: 'processing',
  },
  {
    label: 'Paid',
    value: 'paid',
  },
  {
    label: 'Shipped',
    value: 'shipped',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
  {
    label: 'Cancelled',
    value: 'cancelled',
  },
  {
    label: 'Refunded',
    value: 'refunded',
  },
]

const discountTypeOptions = [
  {
    label: 'Percentage',
    value: 'percentage',
  },
  {
    label: 'Fixed',
    value: 'fixed',
  },
]

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    create: isAnyone,
    read: isAdminOrOrderRead,
    update: isAdminOrOrderWrite,
    delete: isAdminOrOrderWrite,
  },
  fields: [
    {
      label: 'Status',
      type: 'collapsible',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'status',
              type: 'select',
              options: statusOptions,
              required: true,
              defaultValue: 'pending',
              access: {
                create: isAdminOrOrderWriteFieldLevel,
                update: isAdminOrOrderWriteFieldLevel,
              },
              admin: {
                width: '50%',
              },
            },
            {
              name: 'isStockSubtracted',
              type: 'checkbox',
              required: true,
              defaultValue: false,
              access: {
                create: isAdminOrOrderWriteFieldLevel,
                update: isAdminOrOrderWriteFieldLevel,
              },
              admin: {
                width: '50%',
                condition: (_, siblingData) => siblingData.status === 'completed',
              },
            },
          ],
        },
      ],
    },
    // Order Items
    {
      label: 'Order Details',
      type: 'collapsible',
      fields: [
        {
          name: 'orderItems',
          type: 'array',
          minRows: 1,
          validate: async (val: any) => {
            if (!val) return true
            const uniqueSet = new Set()
            for (let i = 0; i < val.length; i++) {
              if (uniqueSet.has(val[i].product)) {
                return 'Order items can not be duplicated!'
              }
              uniqueSet.add(val[i].product)
            }
            return true
          },
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
              required: true,
            },
            orderOrderItemPriceField,
            {
              type: 'row',
              fields: [
                {
                  name: 'quantity',
                  type: 'number',
                  min: 1,
                  defaultValue: 1,
                  required: true,
                },
                orderOrderItemSubtotalField,
              ],
            },
          ],
        },
        // Main
        {
          type: 'row',
          fields: [
            {
              name: 'discountType',
              type: 'radio',
              options: discountTypeOptions,
              required: true,
              defaultValue: 'percentage',
              access: {
                create: isAdminOrOrderWriteFieldLevel,
                update: isAdminOrOrderWriteFieldLevel,
              },
              admin: {
                width: '50%',
                layout: 'horizontal',
              },
            },
            {
              name: 'discountNumber',
              type: 'number',
              min: MIN_DISCOUNT_NUMBER,
              required: true,
              defaultValue: MIN_DISCOUNT_NUMBER,
              access: {
                create: isAdminOrOrderWriteFieldLevel,
                update: isAdminOrOrderWriteFieldLevel,
              },
              admin: {
                width: '50%',
              },
              hooks: {
                beforeValidate: [
                  ({ siblingData }) => {
                    if (
                      siblingData.discountType === 'percentage' &&
                      siblingData.discountNumber > MAX_DISCOUNT_PERCENTAGE
                    ) {
                      siblingData.discountNumber = -1
                    }
                  },
                ],
              },
            },
          ],
        },
        // Something
        orderTotalPreDiscountField,
        orderTotalDiscountField,
        orderGrandTotalField,
        {
          name: 'orderNotes',
          type: 'textarea',
          access: {
            create: isAdminOrOrderWriteFieldLevel,
            update: isAdminOrOrderWriteFieldLevel,
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'billingAddress',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'fullName',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
              required: true,
            },
            {
              name: 'phoneNumber',
              type: 'text',
              required: true,
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'addressLine1',
              label: 'Address Line 1',
              type: 'text',
              required: true,
            },
            {
              name: 'addressLine2',
              label: 'Address Line 2',
              type: 'text',
            },
          ],
        },
        {
          name: 'district',
          type: 'text',
          required: true,
        },
        {
          name: 'province',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'shippingAddress',
      fields: [
        CopyBillingAddressUiField,
        {
          type: 'row',
          fields: [
            {
              name: 'fullName',
              type: 'text',
              required: true,
            },
            {
              name: 'phoneNumber',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'addressLine1',
              label: 'Address Line 1',
              type: 'text',
              required: true,
            },
            {
              name: 'addressLine2',
              label: 'Address Line 2',
              type: 'text',
            },
          ],
        },

        {
          name: 'district',
          type: 'text',
          required: true,
        },
        {
          name: 'province',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'notes',
          type: 'textarea',
          maxLength: MAX_CUSTOMER_NOTES,
        },
      ],
    },
  ],
}