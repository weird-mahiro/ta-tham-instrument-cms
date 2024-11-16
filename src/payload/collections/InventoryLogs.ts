import type { CollectionConfig } from 'payload'
import { isAdminOrProductWrite } from '../access/isAdminOrProductWrite'
import { isAdminOrProductRead } from '../access/isAdminOrProductRead'

const typeOptions = [
  { label: 'Import', value: 'import' },
  { label: 'Export', value: 'export' },
]

export const InventoryLogs: CollectionConfig = {
  slug: 'inventory-logs',
  access: {
    create: isAdminOrProductWrite,
    read: isAdminOrProductRead,
    update: isAdminOrProductWrite,
    delete: isAdminOrProductWrite,
  },
  fields: [
    {
      label: 'Log',
      type: 'collapsible',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'type',
          type: 'radio',
          options: typeOptions,
          required: true,
          defaultValue: 'import',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
}
