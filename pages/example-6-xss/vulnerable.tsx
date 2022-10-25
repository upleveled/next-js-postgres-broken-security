import { BlogPost, getSpecialBlogPosts } from '../../database/blogPosts';
import { CommonContent } from './common';

type Props =
  | {
      error: string;
    }
  | {
      blogPosts: BlogPost[];
    };

export default function MissingAuthenticationGssp(props: Props) {
  return (
    <div>
      <CommonContent {...props} />

      {'blogPosts' in props &&
        props.blogPosts.map((blogPost) => {
          return (
            <div key={`blog-post-${blogPost.id}`}>
              <h2>{blogPost.title} - Vulnerable</h2>
              <div>Published: {String(blogPost.isPublished)}</div>
              <div dangerouslySetInnerHTML={{ __html: blogPost.textContent }} />
            </div>
          );
        })}
    </div>
  );
}

export async function getServerSideProps() {
  const blogPosts = await getSpecialBlogPosts(6);
  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
