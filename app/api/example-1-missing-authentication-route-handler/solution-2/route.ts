import { NextRequest, NextResponse } from 'next/server';
import {
  type BlogPost,
  getPublishedBlogPosts,
} from '../../../../database/blogPosts';
import { getUserByValidSessionToken } from '../../../../database/users';

export const dynamic = 'force-dynamic';

export type MissingAuthenticationApiRouteResponseBodyGet =
  | { error: string }
  | { blogPosts: BlogPost[] };

export async function GET(
  request: NextRequest,
): Promise<NextResponse<MissingAuthenticationApiRouteResponseBodyGet>> {
  const sessionToken = request.cookies.get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json(
      {
        error: 'Session token not provided',
      },
      {
        status: 401,
      },
    );
  }

  const user = await getUserByValidSessionToken(sessionToken);

  if (!user) {
    return NextResponse.json(
      {
        error: 'Session token not valid',
      },
      {
        status: 401,
      },
    );
  }

  const blogPosts = await getPublishedBlogPosts();

  return NextResponse.json({
    blogPosts: blogPosts,
  });
}
