import { Fields, Frontmatter } from "./Common";

export interface PostEdgeFragment {
  id: string;
  fields: Fields;
  frontmatter: Frontmatter;
}

export interface PostEdges {
  // 文章页翻页的实现 依托 buildSiblings 方法  prev, next 作为上下文在文章详情页面使用
  prev: PostEdgeFragment; // 当前页面的上一篇
  node: PostEdgeFragment; // 当前文章
  next: PostEdgeFragment; // 当前文章的下一篇
}

export interface AllPost {
  edges: PostEdges[];
  totalCount: number;
}

// 用于查询所有文章，以此来为每篇文章添加 previous, next
export interface AllPostData {
  allMarkdownRemark: AllPost;
}
