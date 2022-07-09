import {
  CreateNodeArgs,
  CreatePageArgs,
  CreateWebpackConfigArgs,
  CreatePagesArgs,
  GatsbyNode,
  Actions,
  CreateSchemaCustomizationArgs,
} from "gatsby";
import { resolve } from "path";
import moment from "moment";
import pkg from "./package.json";
import { SiblingsNodeInfo, Node } from "./types/Common";
import { AllTagsGroupData } from "./types/AllTagsData";
import {
  AllArchivesData,
  GroupByYearItemInfo,
  GroupByMonthItemInfo,
  GroupByDateItemInfo,
} from "./types/AllArchivesData";
import { AllPostData } from "./types/AllPostData";

const blogNodes: Array<Node> = new Array(); // 所有博文的列表

// 将项目的源码文件路径转换为浏览器访问路径
const getRepoBrowserUrl = (repo: { url: string }): string => {
  if (!repo?.url) return "";
  return repo.url.replace(
    /^git@(github\.com):(.*)\.git$/,
    (match, p1, p2) => `https://${p1}/${p2}`
  );
};

// 获取博文对应的源码文件路径，用于在页面上展示编辑页面
const getSourceFileUrl = (relativePath: string) => {
  if (relativePath == "") return "";
  const browserUrl = getRepoBrowserUrl(pkg.repository);
  const branch = "master";
  return `${browserUrl}/blob/${branch}/content/${relativePath}`;
};

const sortArchivesGroupData = (
  data: GroupByYearItemInfo[] | GroupByMonthItemInfo[] | GroupByDateItemInfo[]
) => {
  if (!data) return;
  data.sort((a, b) => parseInt(b.fieldValue) - parseInt(a.fieldValue));
  data.forEach((item) => {
    if (item.group) {
      sortArchivesGroupData(item.group);
    }
  });
};

// 为 blogNodes 中的每个节点生成兄弟节点 以达到翻页的目的
// 实现思路：先将所有文章按发布时间倒序排序，遍历每个节点取前一个和后一个分别为上一篇和下一篇
const buildSiblingNodes = ({ createNodeField }: Actions) => {
  blogNodes.sort((a, b) => a.fields.createdAt - b.fields.createdAt); // 先排序
  for (let i = 0; i < blogNodes.length; i++) {
    const node = blogNodes[i];
    // 第一个没有上一个
    if (i !== 0) {
      const prev: SiblingsNodeInfo = {
        id: blogNodes[i - 1].id,
        slug: blogNodes[i - 1]?.fields.slug || "",
        title: blogNodes[i - 1]?.frontmatter?.title || "",
        thumbnail: blogNodes[i - 1]?.frontmatter?.thumbnail || "",
      };
      createNodeField({ node, name: "prev", value: prev });
    }
    // 最后一个没有下一个
    if (i !== blogNodes.length - 1) {
      const next: SiblingsNodeInfo = {
        id: blogNodes[i + 1].id,
        slug: blogNodes[i + 1]?.fields.slug || "",
        title: blogNodes[i + 1]?.frontmatter?.title || "",
        thumbnail: blogNodes[i + 1]?.frontmatter?.thumbnail || "",
      };
      createNodeField({ node, name: "next", value: next });
    }
  }
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter
}: CreatePagesArgs) => {
  // console.log("===========createPages===========");
  const { createPage, createRedirect } = actions;
  buildSiblingNodes(actions);
  createRedirect({
    fromPath: "/index.html",
    redirectInBrowser: true,
    toPath: "/",
  });

  // 创建博文页面 包括首页和首页分页(因为首页主要展示的是博文，不包含日志或其它内容)
  {
    const indexTemplate = resolve(__dirname, "src/templates/index.tsx");
    const postTemplate = resolve(__dirname, "src/templates/post.tsx"); // 文章模板
    // 获取所有的博文
    const queryAllPostData = await graphql<AllPostData, string>(`
      query QueryAllPostData {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/archives\//" } } }
          sort: { fields: fields___createdAt, order: DESC }
        ) {
          edges {
            node {
              ...MarkdownRemarkFragment
            }
            next {
              ...MarkdownRemarkFragment
            }
            previous {
              ...MarkdownRemarkFragment
            }
          }
        }
      }

      fragment MarkdownRemarkFragment on MarkdownRemark {
        id
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    `);
    if (queryAllPostData.errors || !queryAllPostData.data) {
      throw Error(queryAllPostData.errors);
    }
    const postPerPage = 9; // 首页每页显示的博文数
    const numPostPages = Math.ceil(blogNodes.length / postPerPage); // 首页总页数

    // 遍历所有文章
    queryAllPostData.data.allMarkdownRemark.edges.forEach((edge) => {
      // 为每篇博文创建一个页面并构造context上下文
      createPage({
        path: edge.node.fields.slug,
        component: postTemplate,
        context: {
          id: edge.node.id,
          slug: edge.node.fields.slug,
          prev: edge.prev,
          next: edge.next,
        },
      });
      reporter.success(`create page for ${edge.node.frontmatter.title} slug: ${edge.node.fields.slug}`);
    });
    // 构造首页分页
    for (let i = 1; i <= numPostPages; i++) {
      createPage({
        path: i === 1 ? "/" : `/page/${i}`,
        component: indexTemplate,
        context: {
          limit: postPerPage,
          skip: (i - 1) * postPerPage,
        },
      });
    }
  }

  // 创建标签页面
  {
    const TagTemplate = resolve(__dirname, "src/templates/tags.tsx"); // 标签模板
    // 遍历所有标签(只针对于博文。日志、友链等页面暂不需要标签)
    const queryAllTagsData = await graphql<AllTagsGroupData, string>(`
      query QueryAllTagsData {
        allMarkdownRemark(filter: { fields: { slug: { regex: "/archives//" } } }) {
          group(field: frontmatter___tags) {
            fieldValue
            nodes {
              fields {
                slug
              }
            }
          }
        }
      }
    `);
    if (queryAllTagsData.errors || !queryAllTagsData.data) {
      throw Error(queryAllTagsData.errors);
    }
    const tagsPostPerPage = 9; // 标签页每页显示的博文数
    let path = "";
    queryAllTagsData.data.allMarkdownRemark.group?.forEach((group) => {
      const numTagPages = Math.ceil(group.nodes.length / tagsPostPerPage); // 每个标签的总页数
      // 遍历每个标签的所有博文
      for (let i = 1; i <= numTagPages; i++) {
        path = i === 1 ? `/tags/${group.fieldValue}` : `/tags/${group.fieldValue}/page/${i}`;
        createPage({
          path,
          component: TagTemplate,
          context: {
            tag: group.fieldValue,
            limit: tagsPostPerPage,
            skip: (i - 1) * tagsPostPerPage,
            buildPath: path,
          },
        });
      }
    });
  }

  // 创建归档页面
  {
    const ArchivesTemplate = resolve("src/templates/archives.tsx"); // 归档模板
    // 归档页面 (只针对于博文。日志、友链等页面暂不需要归档)
    const queryAllArchivesData = await graphql<AllArchivesData, string>(`
      query QueryAllArchivesData {
        allMarkdownRemark(filter: { fields: { slug: { regex: "/archives\//" } } }) {
          totalCount
          group(field: fields___year) {
            group(field: fields___month) {
              group(field: fields___day) {
                nodes {
                  fields {
                    month
                    day
                    year
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
                fieldValue
              }
              fieldValue
            }
            fieldValue
          }
        }
      }
    `);
    if (queryAllArchivesData.errors || !queryAllArchivesData.data) {
      throw Error(queryAllArchivesData.errors);
    }
    const archivesPostPerPage = 10; // 归档页每页显示的博文数
    const numArchivesPages = Math.ceil(
      queryAllArchivesData.data.allMarkdownRemark.totalCount / archivesPostPerPage
    ); // 归档页总页数
    for (let i = 1; i <= numArchivesPages; i++) {
      createPage({
        path: i === 1 ? "/archives" : `/archives/page/${i}`,
        component: ArchivesTemplate,
        context: {
          limit: archivesPostPerPage,
          skip: (i - 1) * archivesPostPerPage,
          numPages: numArchivesPages,
          currentPage: i,
        },
      });
    }
    /*
    // Gatsby 不支持先sort再group，所以需要先group再倒序sort  (按年份分组，按月份分组)
    if (
      queryAllArchivesData.data?.allMarkdownRemark &&
      queryAllArchivesData.data.allMarkdownRemark.totalCount > 0
    ) {
      let totalCount = queryAllArchivesData.data.allMarkdownRemark.totalCount;
      const archivesGroupData = queryAllArchivesData.data?.allMarkdownRemark?.group;
      sortArchivesGroupData(archivesGroupData); // 重新排序
      const archivesPostPerPage = 2;
      const numArchivesPages = Math.floor(totalCount / archivesPostPerPage);
      // 计算余数
      const remainder = totalCount % archivesPostPerPage;
      if (totalCount <= archivesPostPerPage) {
        // 只够一页
        createPage({
          path: "/archives",
          component: ArchivesTemplate,
          context: {
            limit: archivesPostPerPage,
            skip: 0,
          },
        });
      }else{
        const firstSkip = totalCount - archivesPostPerPage - remainder + 1;
        createPage({
          path: "/archives/page/1",
          component: ArchivesTemplate,
          context: {
            buildPath: "/archives/page/1",
            limit: archivesPostPerPage,
            skip: firstSkip,
          },
        });
        createPage({
          path: "/archives",
          component: ArchivesTemplate,
          context: {
            buildPath: "/archives",
            limit: archivesPostPerPage,
            skip: firstSkip,
          },
        });
        console.log("totalCount: ", totalCount);
        totalCount -= firstSkip;
        for (let i = 2; i <= numArchivesPages + 1; i++) {
        console.log("totalCount: ", totalCount);
          const limit = i - 1 === numArchivesPages ? remainder : archivesPostPerPage;
          createPage({
            path: `/archives/page/${i}`,
            component: ArchivesTemplate,
            context: {
              buildPath: `/archives/page/${i}`,
              limit: limit,
              skip: totalCount > 0 ? totalCount - archivesPostPerPage : 0,
            },
          });
          totalCount -= archivesPostPerPage;
        }
      }
    }
    */
  }
};

// 图片被转为sharp格式(internal.type=ImageSharp)
export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  actions,
  getNode,
}: CreateNodeArgs<Node>) => {
  // console.log(`===========onCreateNode===========`);
  const { createNodeField } = actions;
  switch (node.internal.type) {
    // 整个流程按照下述流程
    case "SitePlugin":
      // 站点内启用的插件
      break;
    case "Site":
      // 站点信息
      break;
    case "SiteBuildMetadata":
      // 站点meta信息
      break;
    case "Directory":
      // 插件gatsby-source-filesystem指定的目录 (递归 指定了父目录则子目录也包含进来了，需要注意)
      break;
    case "File":
      // 指定的目录含子目录下所有的未经过处理的源文件(markdown|image|yaml...)
      break;
    case "MarkdownRemark":
      // console.log("id: ", node.id, "title: ", node.frontmatter.title);
      // 这个是被markdown解析插件(gatsby-transformer-remark | gatsby-plugin-mdx )解析后的内容
      // node.parent 就是源文件
      const fileNode = getNode(node.parent || "");
      const relativePath: string = <string>fileNode?.relativePath || "";
      const sourceFileUrl = getSourceFileUrl(relativePath);
      let slug: string = "";
      // 如果指定了slug, 则优先使用（注意不要指定相对位置, 因为这是根据你文件放置的位置决定的）
      if (node.frontmatter.slug && fileNode?.relativeDirectory) {
        slug = fileNode.relativeDirectory + "/" + node.frontmatter.slug;
      } else if (node.frontmatter.url) {
        // 如果指定了url(当然你的url应该形如: https://www.ufec.cn/archives/hello-world.html, 程序会自动截取pathname部分作为slug), 则优先使用url, 注意url一定要合法
        slug = new URL(node.frontmatter.url)?.pathname.substring(1);
      } else {
        // 如果什么都不指定, 则使用文件名(含上一级目录)作为slug
        slug = relativePath.replace(/(.*)\.md/, (match, p1) => `${p1}.html`);
      }
      const splitSlug = slug.split("/");
      if (splitSlug.length !== 2) {
        throw Error("文件后缀有误请检查, 格式: dir[archives | journals | ....]/slug.html");
      }
      let tempSlug = splitSlug[1]; // 去掉目录后的slug
      const splitTempSlug = tempSlug.split(".html");
      if (splitTempSlug.length > 2) {
        throw Error("文件后缀有误请检查, 格式: dir[archives | journals | ....]/slug.html");
      } else if (splitTempSlug.length == 1) {
        // 如果没有后缀, 则默认为.html
        splitTempSlug.push(".html");
      } else {
        splitTempSlug[1] = ".html";
      }
      try {
        // 驼峰转 - 连接
        const formatSlug = splitTempSlug[0]
          .replace(/[A-Z]/g, (match) => {
            return "-" + match.toLowerCase();
          })
          .trimStart();
        // 避免本身就是符合规则的slug
        if (formatSlug.startsWith("-")) {
          splitTempSlug[0] = formatSlug.substring(1);
        }else{
          splitTempSlug[0] = formatSlug;
        }
      } catch (error) {
        throw error;
      }
      slug = `${splitSlug[0]}/${splitTempSlug.join("")}`;
      createNodeField({ node, name: "sourceFileUrl", value: sourceFileUrl }); // 用于在界面上展示 `在GitHub上编辑此界面`
      createNodeField({ node, name: "slug", value: slug }); // 修改node slug 字段值 (一般用于该文章链接后缀)
      // 将创建日期、更新日期转为时间戳
      if (node?.frontmatter) {
        if (node.frontmatter?.date) {
          const momentCreatedAt = moment(node?.frontmatter?.date);
          if (!momentCreatedAt.isValid()) {
            console.error(
              `ERROR: you have an error format frontmatter.data at file '${node.fileAbsolutePath}', format must is YYYY-MM-DD HH:mm:ss`
            );
            throw Error();
          } else {
            createNodeField({
              node,
              name: "createdAt",
              value: <number>momentCreatedAt.valueOf(),
            });
            createNodeField({
              node,
              name: "year",
              value: <number>momentCreatedAt.year(),
            });
            createNodeField({
              node,
              name: "month",
              value: <number>momentCreatedAt.month() + 1,
            });
            createNodeField({
              node,
              name: "day",
              value: <number>momentCreatedAt.date(),
            });
          }
        }
        if (node.frontmatter?.updated) {
          const momentUpdatedAt = moment(node?.frontmatter?.updated);
          if (!momentUpdatedAt.isValid()) {
            console.error(
              `ERROR: you have an error format frontmatter.updated at file '${node.fileAbsolutePath}', format must is YYYY-MM-DD HH:mm:ss`
            );
            throw Error();
          } else {
            createNodeField({
              node,
              name: "updatedAt",
              value: <number>momentUpdatedAt.valueOf(),
            });
          }
        }
      }
      // 博文列表只需要archives
      if (slug.startsWith("archives/")) {
        blogNodes.push(node);
      }
      break;
    case "SitePage":
      // 全站所有可访问的站点(md文件生成的页面 + src/pages/下的页面)
      // console.log("node: ", node);
      break;
  }
};

export const onCreatePage: GatsbyNode["onCreatePage"] = async ({
  actions,
  page,
}: CreatePageArgs) => {
  // console.log("===========onCreatePage===========");
  const { createPage } = actions;
  createPage(page);
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  // 自定义类型 (使用GraphQL支持的类型组合成新类型)
  const Types = `
      type SiblingsNodeInfo {
        title: String
        slug: String
        id: String
        thumbnail: String
      }

      type Fields {
        slug: String
        sourceFileUrl: String
        prev: SiblingsNodeInfo
        next: SiblingsNodeInfo
        month: Int
        day: Int
        year: Int
      }
      
      type FrontMatter {
        title: String
        url: String
        tags: [String]
        slug: String
        author: [String]
        categories: [String]
        thumbnail: String
      }

      type MarkdownRemark implements Node @infer {
        frontmatter: FrontMatter
        fields: Fields
      }
    `;
  createTypes(Types);
};

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = async ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}: CreateWebpackConfigArgs) => {
  // console.log("===========onCreateWebpackConfig===========");
  if (stage == "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /canvas/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
