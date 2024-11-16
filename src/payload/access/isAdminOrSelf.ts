import { Access } from 'payload'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.includes('admin.all')) {
      return true
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }
  return false
}
