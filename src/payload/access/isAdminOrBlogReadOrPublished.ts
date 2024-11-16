import { Access } from 'payload'

export const isAdminOrBlogReadOrPublished: Access = ({ req: { user } }) => {
  if (user && (user.roles?.includes('admin.all') || user.roles?.includes('blog.read'))) {
    return true
  }
  return {
    _status: {
      equals: 'published',
    },
  }
}
