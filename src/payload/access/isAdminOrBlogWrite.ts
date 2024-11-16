import { Access } from 'payload'

export const isAdminOrBlogWrite: Access = ({ req: { user } }) => {
  if (user && (user.roles?.includes('admin.all') || user.roles?.includes('blog.write'))) {
    return true
  }
  return false
}
