import LinkIfNotCurrent from '../../components/LinkIfNotCurrent';
import { BlogPost } from '../../database/blogPosts';

type Props =
  | {
      error: string;
    }
  | {
      blogPosts: BlogPost[];
    };

export function CommonContent(props: Props) {
  return (
    <>
      <h1>XSS - getServerSideProps</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-6-xss/vulnerable">
            Vulnerable
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-6-xss/solution-1">
            Solution 1
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-6-xss/solution-2">
            Solution 2
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-6-xss/solution-3">
            Solution 3
          </LinkIfNotCurrent>
        </li>
      </ul>

      <hr />

      <div>
        The following blog posts should only be visible for logged-in users.
        <br />
        <br />
        If a user is not logged in, an error message should appear.
      </div>

      <h2>Blog Posts</h2>

      {'error' in props && <div style={{ color: 'red' }}>{props.error}</div>}
    </>
  );
}

// Export component for Next.js page build
export default function Common() {
  return null;
}
