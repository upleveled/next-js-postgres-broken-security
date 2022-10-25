import DOMPurify from 'dompurify';
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
              <h2>{blogPost.title}</h2>
              <div>Published: {String(blogPost.isPublished)}</div>
              <div><p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blogPost.textContent)}}></p></div>
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
