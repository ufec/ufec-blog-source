import { graphql } from "gatsby";
import React from "react";
import Card from "../components/ArticleItem/Card";
import HeaderImage from "../components/HeaderImage/HeaderImage";
import Layout from "../components/layout/Layout";
import Paginate from "../components/paginate/Paginate";
import { IndexPageData } from "../../types/IndexPageData";
import { SiteInfoProvider } from "../../types/Common";

interface IndexProps {
  data: IndexPageData;
  location: Location;
}

const Index = ({ data, location }: IndexProps) => {
  return (
    <Layout location={location}>
      <SiteInfoProvider.Consumer>
        {(siteInfo) => (
          <div className="mx-auto" id="container">
            <HeaderImage
              idName="hero"
              title={siteInfo.site.siteMetadata.title}
              imgSrc="https://ghproxy.com/https://raw.githubusercontent.com/xzhuz/static/master/uPic/default-bg.jpg"
              slogan={siteInfo.site.siteMetadata.description}
            />
            <div className="mx-auto fade-up px-5 md:px-0 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
              <h3 className="mb-4 mt-8 dark:text-gray-300 hidden md:block">
                <span className="iconfont icon-new text-red-600 mr-2 text-base "></span>
                最新文章
              </h3>
              <div className="posts grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 lg:gap-6 md:gap-4 sm:gap-3 mt-4 pagination-container">
                {data.allMarkdownRemark.edges.map((edge) => {
                  return (
                    <Card
                      key={edge.node.fields.slug}
                      title={edge.node.frontmatter.title || ""}
                      slug={edge.node.fields.slug || ""}
                      src={edge.node.frontmatter?.thumbnail || ""}
                      srcSet={edge.node.frontmatter?.thumbnail || ""}
                      location={location}
                      tags={edge.node.frontmatter.tags || []}
                      date={edge.node.frontmatter.date || ""}
                    />
                  );
                })}
              </div>
              <Paginate
                pageInfo={data.allMarkdownRemark.pageInfo}
                prefix={"/page"}
                indexPagePath={"/"}
              />
            </div>
          </div>
        )}
      </SiteInfoProvider.Consumer>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query QueryIndexPage($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fields: { slug: { regex: "/archives//" } } }
      limit: $limit
      skip: $skip
    ) {
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        totalCount
        perPage
      }
      edges {
        node {
          id
          excerpt
          frontmatter {
            thumbnail
            title
            date(formatString: "YYYY-MM-DD")
            tags
            categories
            author
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
