import type { CollectionConfig } from 'payload'
import { isAdminOrProductWrite } from '@/payload/access/isAdminOrProductWrite'
import { isAnyone } from '@/payload/access/isAnyone'

// read -> anyone, create
export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdminOrProductWrite,
    read: isAnyone,
    update: isAdminOrProductWrite,
    delete: isAdminOrProductWrite,
  },
  fields: [
    {
      label: 'General',
      type: 'collapsible',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      label: 'Join',
      type: 'collapsible',
      fields: [
        {
          name: 'relatedProducts',
          admin: {
            allowCreate: false,
          },
          type: 'join',
          collection: 'products',
          on: 'category',
        },
      ],
    },
  ],
}
