import type { CollectionConfig } from 'payload'
import { isAdminOrProductWrite } from '@/payload/access/isAdminOrProductWrite'
import { productPriceField } from '@/payload/fields/productPrice'
import { StockUIField } from '@/payload/fields/productStock'
import { isAdminOrProductReadOrIsDisplayed } from '@/payload/access/isAdminOrProductReadOrIsDisplayed'

const MAX_DETAILS_ARRAY = 3

// IF LATER NEEDED TO CHANGE THE OUTLINE -> REFACTOR INTO BLOCKS

// Swap in the price compoent for display
export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'code',
  },
  access: {
    create: isAdminOrProductWrite,
    read: isAdminOrProductReadOrIsDisplayed,
    update: isAdminOrProductWrite,
    delete: isAdminOrProductWrite,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product Information',
          fields: [
            {
              label: 'General',
              type: 'collapsible',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'isDisplayed',
                      type: 'checkbox',
                      required: true,
                      defaultValue: false,
                    },
                    {
                      name: 'isFeatured',
                      type: 'checkbox',
                      required: true,
                      defaultValue: false,
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'code',
                      type: 'text',
                      unique: true,
                      required: true,
                    },
                    {
                      name: 'name',
                      type: 'text',
                      localized: true,
                    },
                  ],
                },
                productPriceField,
                {
                  name: 'images',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                  hasMany: true,
                },
                {
                  name: 'shortDescription',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
            {
              name: 'specialDetails',
              type: 'group',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                },
                {
                  name: 'details',
                  type: 'array',
                  maxRows: MAX_DETAILS_ARRAY,
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'title', type: 'text' },
                        { name: 'description', type: 'text' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: 'Relations',
              type: 'collapsible',
              fields: [
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'product-categories',
                },
              ],
            },
          ],
        },
        {
          label: 'Inventory',
          fields: [
            {
              label: 'Logs',
              type: 'collapsible',
              fields: [
                StockUIField,
                {
                  name: 'inventoryLogs',
                  type: 'join',
                  collection: 'inventory-logs',
                  on: 'product',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
