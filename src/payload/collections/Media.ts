import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'large',
        width: 1400,
      },
    ],
  },
}
