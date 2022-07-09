import { Fields, Frontmatter, HTMLAst, WordCount } from "./Common";

interface PostMarkdownRemark {
  id: string;
  fields: Fields;
  frontmatter: Frontmatter;
  htmlAst: HTMLAst;
  excerpt: string;
  timeToRead: number;
  tableOfContents: string;
  wordCount: WordCount;
}

export interface PostData {
  markdownRemark: PostMarkdownRemark;
}
