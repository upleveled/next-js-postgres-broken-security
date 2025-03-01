import { cookies } from 'next/headers';
import { getUnpublishedBlogPosts } from '../../../database/blogPosts';
import { getUserByValidSessionToken } from '../../../database/users';
import Common from '../common';
import MissingAuthorizationServerComponent from './MissingAuthorizationServerComponent';

export const dynamic = 'force-dynamic';

export default async function MissingAuthorizationServerComponentPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserByValidSessionToken(sessionToken.value);

  const blogPosts = await getUnpublishedBlogPosts();

  return (
    <>
      <Common />

      <MissingAuthorizationServerComponent blogPosts={blogPosts} user={user} />
    </>
  );
}
