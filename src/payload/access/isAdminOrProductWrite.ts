import { Access } from 'payload'

export const isAdminOrProductWrite: Access = ({ req: { user } }) => {
  if (user && (user.roles?.includes('admin.all') || user.roles?.includes('product.write'))) {
    return true
  }
  return false
}
