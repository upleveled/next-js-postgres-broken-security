import { getPublishedBlogPosts } from '../../../database/blogPosts';
import Common from '../common';

export default async function MissingAuthenticationServerComponent() {
  const blogPosts = await getPublishedBlogPosts();

  return <Common blogPosts={blogPosts} />;
}
