import { Access } from 'payload'

export const isAdminOrProductReadOrIsDisplayed: Access = ({ req: { user } }) => {
  if (user && (user.roles?.includes('admin.all') || user.roles?.includes('product.read'))) {
    return true
  }
  return {
    isDisplayed: {
      equals: true,
    },
  }
}
