import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  BlogPost,
  getPublishedBlogPostsBySessionToken,
} from '../../database/blogPosts';
import Common from './common';

type Props =
  | {
      error: string;
    }
  | {
      blogPosts: BlogPost[];
    };

export default function MissingAuthenticationGssp(props: Props) {
  return <Common {...props} />;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const sessionToken = context.req.cookies.sessionToken;

  if (!sessionToken) {
    return {
      props: {
        error: 'Session token not provided',
      },
    };
  }

  const blogPosts = await getPublishedBlogPostsBySessionToken(sessionToken);

  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
