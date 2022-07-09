import { graphql } from "gatsby";
import React from "react";
import { TagsGruop } from "../../types/AllTagsData";
import Layout from "../components/layout/Layout";
import Tag from "../components/tag/Tag";

interface TagsPageProps {
  location: Location;
  data: TagsGruop;
}

const Tags = ({ location, data }: TagsPageProps) => {
  return (
    <Layout location={location} seoProps={{ title: "标签列表" }}>
      <>
        <header
          id="postHeader"
          className="bg-gray-900 table fade-down relative w-full opacity-95 z-10 h-1/2"
        >
          <div className="cover-bg bottom-0 left-0 right-0 top-0 opacity-30 absolute">
            <img
              className="h-full w-full left-0 object-cover absolute top-0 dark:filter-60 no-zoom"
              src="https://my-static.ufec.cn/blog/8885de4772b45721003402ea5aca50f2.png"
              alt="标签列表"
            />
          </div>
          <div className="h-96 align-middle table-cell relative w-full index justify-center">
            <h2 className="text-white mb-5 mt-4 leading-loose relative w-full text-2xl md:text-4xl text-center dark:text-gray-300">
              标签列表{data.allMarkdownRemark.group.length}
            </h2>
          </div>
        </header>
        <div className="mx-auto px-10 my-16 max-w-5xl tracking-wider md:leading-relaxed sm:leading-normal fade-up cloud">
          <h2 className="dark:text-gray-300 my-4">标签</h2>
          <p className="flex flex-row justify-start flex-wrap">
            {data.allMarkdownRemark.group.map((item) => {
              return (
                <Tag
                  key={item.fieldValue}
                  tagName={item.fieldValue}
                  tagUrl={`/tags/${item.fieldValue}`}
                  showNumber={true}
                  postCount={item.totalCount}
                />
              );
            })}
          </p>
          <h2 className="dark:text-gray-300 my-4 hidden md:block">云</h2>
        </div>
      </>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query TagsGruopQuery {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
