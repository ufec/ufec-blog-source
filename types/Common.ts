import { Node as GatsbyNode } from "gatsby";
import React from "react";

// 分页信息
export interface PageInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  pageCount: number;
  totalCount: number;
  perPage: number;
}

export interface PageContext {
  tag: string;
}

// 站点元信息
export interface SiteMetadata {
  owner: string;
  title: string;
  siteUrl: string;
  description: string;
}

export interface SiteInfo {
  siteMetadata: SiteMetadata;
}
export interface Site {
  site: SiteInfo;
}

export interface SitePage {
  pageContext: PageContext;
}

export interface Node extends GatsbyNode {
  fields: Fields;
  frontmatter: Frontmatter;
}

// 兄弟节点 用于文章详情页翻页 依托 buildSiblings 方法实现
export interface SiblingsNodeInfo {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
}

// 自定义的字段
export interface Fields {
  slug: string;
  sourceFileUrl: string;
  createdAt: number;
  updatedAt: number;
  year: number;
  month: number;
  day: number;
  prev: SiblingsNodeInfo;
  next: SiblingsNodeInfo;
}

export interface FluidObject {
  src: string; // 原图片地址
  srcSet: string; // 原图片地址集合(适配不同的屏宽)
  srcWebp?: string; // webp 格式地址
  srcSetWebp?: string; // webp 格式地址集合(适配不同的屏宽)
  aspectRatio: number; // 宽高比
  sizes: string; // 图片尺寸
}

export interface ChildImageSharp {
  fluid: FluidObject;
}

export interface FeaturedImage {
  childImageSharp: ChildImageSharp;
}

// .md[x] 文件中声明的字段
export interface Frontmatter {
  author: string[];
  categories: string[];
  date: string;
  slug: string | null;
  tags: string[];
  thumbnail: string | null;
  title: string;
  updated: string;
  url: string;
  featuredImage: FeaturedImage | null;
}

export interface WordCount {
  words: number; // 字数
  sentences: number; // 句子数
  paragraphs: number; // 段落数
}

export interface HTMLAst {
  type: string;
  children?: HTMLAst[];
  tagName?: string;
  value?: string;
  properties?: Record<string, string | number | boolean | undefined>;
}

// GitHub用户信息
export interface GithubUser {
  avatar_url: string;
  bio: string;
  login: string;
  html_url: string;
}

export const SiteInfoProvider = React.createContext<Site>({
  site: {
    siteMetadata: {
      owner: "",
      title: "",
      siteUrl: "",
      description: "",
    },
  },
});
