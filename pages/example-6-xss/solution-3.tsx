import ReactMarkdown from 'react-markdown';
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
          // be careful which markdown library you use and how you use it
          // by default the markdown standard supports html tags too
          // so never assign markdown directly to innerHTML
          // but the default usage of "ReactMarkdown" is safe
          return (
            <div key={`blog-post-${blogPost.id}`}>
              <h2>{blogPost.title}</h2>
              <div>Published: {String(blogPost.isPublished)}</div>
              <ReactMarkdown children={blogPost.textContent} />
            </div>
          );
        })}
    </div>
  );
}

export async function getServerSideProps() {
  const blogPosts = await getSpecialBlogPosts(7);
  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
