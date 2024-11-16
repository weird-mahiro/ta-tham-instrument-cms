import { Access } from 'payload'

export const isAdminOrProductRead: Access = ({ req: { user } }) => {
  if (user && (user.roles?.includes('admin.all') || user.roles?.includes('product.read'))) {
    return true
  }
  return false
}
