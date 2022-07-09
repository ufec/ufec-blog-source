import { graphql } from "gatsby";
import React from "react";
import { Node, SitePage } from "../../types/Common";
import Card from "../components/ArticleItem/Card";
import Layout from "../components/layout/Layout";
import Paginate from "../components/paginate/Paginate";
import { PageInfo } from "../../types/Common";
import HeaderImage from "../components/HeaderImage/HeaderImage";

interface TagsTemplateProps {
  location: Location;
  data: {
    allMarkdownRemark: {
      nodes: Array<Pick<Node, "fields" | "frontmatter" | "id">>;
      pageInfo: PageInfo;
    };
    sitePage: Pick<SitePage, "pageContext">;
  };
}

const TagsTemplate = ({ location, data }: TagsTemplateProps) => {
  return (
    <Layout location={location} seoProps={{ title: `${data.sitePage.pageContext?.tag}` }}>
      <div className="mx-auto" id="container">
        <HeaderImage
          title={data.sitePage.pageContext.tag}
          number={data.allMarkdownRemark.pageInfo.totalCount}
        />
        <div className="mx-auto fade-up pt-4 px-5 md:px-0 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
          <div className="posts grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 lg:gap-6 md:gap-4 sm:gap-3 mt-4 pagination-container">
            {data.allMarkdownRemark.nodes.map((node) => {
              console.log(node.frontmatter);
              return (
                <Card
                  key={node.fields.slug}
                  title={node.frontmatter.title || ""}
                  thumbnail={node.frontmatter.thumbnail || ""}
                  slug={node.fields.slug || ""}
                  location={location}
                  tags={node.frontmatter.tags || []}
                  date={node.frontmatter.date || ""}
                  src={node.frontmatter?.thumbnail || ""}
                  srcSet={node.frontmatter?.thumbnail || ""}
                  sizes={node.frontmatter?.thumbnail || ""}
                />
              );
            })}
          </div>
          <Paginate
            pageInfo={data.allMarkdownRemark.pageInfo}
            prefix={`/tags/${data.sitePage.pageContext.tag}/page`}
            indexPagePath={`/tags/${data.sitePage.pageContext.tag}`}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TagsTemplate;

export const pageQuery = graphql`
  query TagQuery($buildPath: String!, $tag: String!, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $tag } }, fields: { slug: { regex: "/archives//" } } }
      limit: $limit
      skip: $skip
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          updated(formatString: "YYYY-MM-DD")
          slug
          thumbnail
          author
          url
          tags
        }
        fields {
          slug
          sourceFileUrl
          createdAt
          updatedAt
        }
      }
      pageInfo {
        perPage
        totalCount
        pageCount
        itemCount
        hasPreviousPage
        hasNextPage
        currentPage
      }
    }
    sitePage(path: { eq: $buildPath }) {
      pageContext
    }
  }
`;
