// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { ProductCategories } from './payload/collections/ProductCategories'
import { Products } from './payload/collections/Products'
import { InventoryLogs } from './payload/collections/InventoryLogs'
import { Orders } from './payload/collections/Orders'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ProductCategories, Products, InventoryLogs, Orders],
  localization: {
    locales: [
      { label: 'Vietnamese', code: 'vi' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'vi',
    fallback: true,
  },
  editor: lexicalEditor({
    features: () => {
      return [
        ParagraphFeature(),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        LinkFeature({
          enabledCollections: ['products'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
    nestedDocsPlugin({
      collections: ['product-categories'],
    }),
  ],
})
