import { cookies } from 'next/headers';
import { getUnpublishedBlogPosts } from '../../../database/blogPosts';
import { getUserByValidSessionToken } from '../../../database/users';
import Common from '../common';

export default async function MissingAuthorizationServerComponent() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserByValidSessionToken(sessionToken.value);

  const blogPosts = await getUnpublishedBlogPosts();

  return (
    <>
      <Common />
      <Common />

      {blogPosts
        // Filter to blog posts owned by the user
        // Vulnerability fixed?
        .filter((blogPost) => {
          return blogPost.userId === user?.id;
        })
        .map((blogPost) => {
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
