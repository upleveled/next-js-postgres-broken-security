import { getUnpublishedBlogPosts } from '../../../database/blogPosts';
import Common from '../common';

export default async function MissingAuthorizationServerComponent() {
  const blogPosts = await getUnpublishedBlogPosts();

  return (
    <>
      <Common />

      {blogPosts.map((blogPost) => {
        return (
          <div key={`blog-post-${blogPost.id}`}>
            <h2>{blogPost.title}</h2>
            <div>Published: {String(blogPost.isPublished)}</div>
            <div>{blogPost.textContent}</div>
          </div>
        );
      })}
    </>
  );
}
