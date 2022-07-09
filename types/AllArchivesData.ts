import { Fields, Frontmatter } from "./Common";

export interface ArchivesGroupNode {
  fields: Pick<Fields, "slug" | "year" | "month" | "day">;
  frontmatter: Pick<Frontmatter, "title">;
}

export interface GroupByDateItemInfo {
  fieldValue: string; // 日期
  group: never; // 无用
  nodes: ArchivesGroupNode[];
}

export interface GroupByMonthItemInfo {
  fieldValue: string; // 月份
  group: GroupByDateItemInfo[];
}

export interface GroupByYearItemInfo {
  fieldValue: string; // 年份
  group: GroupByMonthItemInfo[];
}

export interface AllArchivesGroupData {
  totalCount: number; // 总共的文章数
  group: GroupByYearItemInfo[];
}

export interface AllArchivesData {
  allMarkdownRemark: AllArchivesGroupData;
}
