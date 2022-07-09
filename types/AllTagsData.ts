import { Fields } from "./Common";

export interface GroupNodeInfo {
  fields: Pick<Fields, "slug">;
}

export interface GroupItemInfo {
  fieldValue: string;
  nodes: GroupNodeInfo[];
}

export interface GroupedTagsData {
  group: GroupItemInfo[];
}

export interface AllTagsGroupData {
  allMarkdownRemark: GroupedTagsData;
}

export interface TagsGruopItem {
  fieldValue: string;
  totalCount: number;
}

export interface TagsGruopData {
  group: TagsGruopItem[];
}

export interface TagsGruop {
  allMarkdownRemark: TagsGruopData;
}
