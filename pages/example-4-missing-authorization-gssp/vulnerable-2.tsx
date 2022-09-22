import LinkIfNotCurrent from '../../components/LinkIfNotCurrent';
import { BlogPost, getUnpublishedBlogPosts } from '../../database/blogPosts';
import { User } from '../../database/users';

type Props =
  | {
      error: string;
      userObject: User;
    }
  | {
      blogPosts: BlogPost[];
      userObject: User;
    };

export default function MissingAuthentication(props: Props) {
  return (
    <div>
      <h1>Missing Authorization - getServerSideProps</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-gssp/vulnerable">
            Vulnerable
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-4-missing-authorization-gssp/vulnerable.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-gssp/solution-1">
            Solution 1
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-4-missing-authorization-gssp/solution-1.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-gssp/solution-2">
            Solution 2
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-4-missing-authorization-gssp/solution-2.ts
          </code>
        </li>
      </ul>

      <hr />

      <div>
        Below, a list of unpublished blog posts will appear for logged-in users
        - similar to a "Drafts" list in a CMS.
        <br />
        <br />
        Each unpublished blog post should only be visible for the owner of the
        post.
      </div>

      <h2>Unpublished Blog Posts</h2>

      {'error' in props && <div style={{ color: 'red' }}>{props.error}</div>}

      {'blogPosts' in props &&
        props.blogPosts.map((blogPost) => {
          return (
            // Filter to blog posts owned by the user
            blogPost.userId === props.userObject.id && (
              <div key={`blog-post-${blogPost.id}`}>
                <h2>{blogPost.title}</h2>
                <div>Published: {String(blogPost.isPublished)}</div>
                <div>{blogPost.textContent}</div>
              </div>
            )
          );
        })}
    </div>
  );
}

export async function getServerSideProps() {
  const blogPosts = await getUnpublishedBlogPosts();
  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
