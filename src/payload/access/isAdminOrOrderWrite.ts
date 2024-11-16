import { Access, FieldAccess } from 'payload'

// Anyone can create an order -> restrict on discount

export const isAdminOrOrderWrite: Access = ({ req: { user } }) => {
  if (user && (user.roles?.includes('admin.all') || user.roles?.includes('order.write'))) {
    return true
  }
  return false
}
export const isAdminOrOrderWriteFieldLevel: FieldAccess = ({ req: { user } }) => {
  if (user && (user.roles?.includes('admin.all') || user.roles?.includes('order.write'))) {
    return true
  }
  return false
}
