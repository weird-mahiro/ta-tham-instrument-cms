import type { CollectionConfig } from 'payload'
import { isAdminOrProductWrite } from '../access/isAdminOrProductWrite'
import { productPriceField } from '../fields/productPrice'
import { StockUIField } from '../fields/productStock'
import { isAdminOrProductReadOrIsDisplayed } from '../access/isAdminOrProductReadOrIsDisplayed'

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
      label: 'General Information',
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
            mimeTypes: {
              contains: 'image',
            },
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
    {
      label: 'Inventory',
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
}
