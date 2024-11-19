import { Access, FieldAccess } from 'payload'

export const isAdminOrOrderRead: Access = ({ req: { user } }) => {
  if (user && (user.roles?.includes('admin.all') || user.roles?.includes('order.read'))) {
    return true
  }
  return false
}

export const isAdminOrOrderReadFieldLevel: FieldAccess = ({ req: { user } }) => {
  if (user && (user.roles?.includes('admin.all') || user.roles?.includes('order.read'))) {
    return true
  }
  return false
}
