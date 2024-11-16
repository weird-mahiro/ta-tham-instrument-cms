import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf } from '../access/isAdminOrSelf'

// Admin -> change role access. Self -> only change Name and stuff
const roleOptions = [
  { label: 'admin.all', value: 'admin.all' },
  { label: 'product.read', value: 'product.read' },
  { label: 'product.write', value: 'product.write' },
  { label: 'order.read', value: 'order.read' },
  { label: 'order.write', value: 'order.write' },
  { label: 'blog.read', value: 'blog.read' },
  { label: 'blog.write', value: 'blog.write' },
]

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: roleOptions,
    },
  ],
}
