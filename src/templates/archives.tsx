import { graphql } from "gatsby";
import React from "react";
import { AllArchivesData } from "../../types/AllArchivesData";
import HeaderImage from "../components/HeaderImage/HeaderImage";
import Layout from "../components/layout/Layout";
import "../styles/archives.css";

interface ArchivesTemplateProps {
  location: Location;
  data: AllArchivesData;
}

const ArchivesSection = ({ data }: { data: AllArchivesData }) => {
  return (
    <div className="mx-auto px-10 my-16 max-w-5xl tracking-wider md:leading-relaxed sm:leading-normal fade-up">
      {data.allMarkdownRemark.group.map((groupYear) => {
        return (
          <>
            {groupYear.group.map((groupMonth) => {
              return (
                <section className="archive-year pt-0.5 pb-0.5 px-0 relative border-transparent">
                  <h1 className="m-0 leading-9 text-gray-800 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 relative">
                    {groupYear.fieldValue}
                  </h1>
                  <div className="relative pl-12">
                    <header className="absolute archive-hd py-0 pl-2.5 pr-2.5 rounded left-6 text-white uppercase font-semibold leading-loose mt-6 af-bg-fff bg-gray-400 dark:bg-gray-700 dark:text-gray-100">
                      {groupMonth.fieldValue} 月
                    </header>
                    <span>
                      {groupMonth.group.map((groupDate) => {
                        return (
                          <>
                            {groupDate.nodes.map((node) => {
                              return (
                                <a
                                  className="archive-info transition-colors relative block ml-6 px-0 pt-2 pb-2 leading-8"
                                  href={`/${node.fields.slug}`}
                                >
                                  <span
                                    style={{ lineHeight: "inherit" }}
                                    className="archive-date float-left pr-2 whitespace-nowrap tracking-wide text-sm opacity-60 dark:text-gray-300"
                                  >{`${groupMonth.fieldValue}-${groupDate.fieldValue}`}</span>
                                  <span
                                    style={{ lineHeight: " inherit", position: "relative" }}
                                    className="archive-title bg-box-shadow table-cell text-lg dark:text-gray-300"
                                  >
                                    {node.frontmatter.title}
                                  </span>
                                </a>
                              );
                            })}
                          </>
                        );
                      })}
                    </span>
                  </div>
                </section>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

const ArchivesTemplate = ({ location, data }: ArchivesTemplateProps) => {
  console.log(data);
  return (
    <Layout location={location}>
      <div className="mx-auto" id="container">
        <HeaderImage title="归档" />
        <ArchivesSection data={data} />
      </div>
    </Layout>
  );
};

export default ArchivesTemplate;

export const pageQuery = graphql`
  query QueryArchivesData($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      filter: { fields: { slug: { regex: "/archives//" } } }
    ) {
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
`;
