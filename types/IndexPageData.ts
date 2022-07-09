import { Frontmatter, PageInfo } from "./Common";

export interface IndexPageNodeFields {
  slug: string;
}

export interface IndexPageFrontmatter {
  title: string;
  thumbnail: string;
  date: string;
  author: string[];
  tags: string[];
  categories: string[];
}

export interface IndexPageNode {
  id: string;
  excerpt: string;
  html: string;
  fields: IndexPageNodeFields;
  frontmatter: Frontmatter;
}

export interface IndexPageEdge {
  node: IndexPageNode;
}

export interface IndexPage {
  edges: IndexPageEdge[];
  pageInfo: PageInfo;
}

export interface IndexPageData {
  allMarkdownRemark: IndexPage;
}
