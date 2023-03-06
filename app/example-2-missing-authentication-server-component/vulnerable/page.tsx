import { getPublishedBlogPosts } from '../../../database/blogPosts';
import Common from '../common';

export default async function MissingAuthenticationGssp() {
  const blogPosts = await getPublishedBlogPosts();

  return <Common blogPosts={blogPosts} />;
}
