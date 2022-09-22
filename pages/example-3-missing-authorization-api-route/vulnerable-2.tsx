import { useEffect, useState } from 'react';
import { BlogPost } from '../../database/blogPosts';
import { User } from '../../database/users';
import Common from './common';

type Props = {
  userObject: User;
};

export default function MissingAuthentication(props: Props) {
  const [error, setError] = useState<string>();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchInitialData() {
      const response = await fetch(
        '/api/example-3-missing-authorization-api-route/vulnerable',
      );

      const data = await response.json();

      if ('error' in data) {
        setError(data.error);
        return;
      }

      setError(undefined);

      setBlogPosts(
        data.blogPosts.filter((blogPost: BlogPost) => {
          return blogPost.userId === props.userObject.id;
        }),
      );
    }

    fetchInitialData().catch(() => {});
  }, [props.userObject]);

  return <Common {...props} error={error} blogPosts={blogPosts} />;
}
