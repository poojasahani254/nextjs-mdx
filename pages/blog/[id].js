import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import SyntaxHighlighter from "react-syntax-highlighter";
import matter from "gray-matter";
import Nav from "../../components/Nav";

const components = { Nav, SyntaxHighlighter };
const PostPage = ({ frontMatter: { title }, mdxSource }) => {
  return (
    <div className="mt-4">
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      id: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", id + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      id,
      mdxSource,
    },
  };
}

export default PostPage;
