import React from "react";
import LinkListYaml from "../../content/links.yaml";
import { Site, SiteInfoProvider } from "../../types/Common";
import HeaderImage from "../components/HeaderImage/HeaderImage";
import Layout from "../components/layout/Layout";
import "../styles/links.css";

interface LinksProps {
  location: Location;
}

interface LinkListObject {
  [key: string]: Array<{
    title: string;
    description: string;
    url: string;
    avatar: string;
    weight: number & 0;
  }>;
}

const Links = ({ location }: LinksProps) => {
  const linkList = LinkListYaml as LinkListObject;
  Object.keys(linkList).forEach((key) => {
    linkList[key].sort((a, b) => b.weight - a.weight);
  });
  return (
    <Layout location={location} seoProps={{ title: "友情链接" }}>
      <SiteInfoProvider.Consumer>
        {(siteInfo: Site) => (
          <div className="mx-auto" id="container">
            <HeaderImage
              idName="links"
              avatar={`https://avatars.githubusercontent.com/${siteInfo.site.siteMetadata.owner}`}
              title={siteInfo.site.siteMetadata.title}
              slogan={siteInfo.site.siteMetadata.description}
            />
            <div className="mx-auto px-10 my-16 tracking-wider md:leading-relaxed sm:leading-normal max-w-5xl fade-up">
              {Object.keys(linkList).map((key) => {
                return (
                  <React.Fragment key={key}>
                    <h3 className="w-full m-4 dark:text-gray-300">{key}</h3>
                    <div className="flex-row flex-wrap justify-items-center grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                      {linkList[key].map((item, index) => {
                        return (
                          <a
                            className="links-item m-card slide-up flex p-1.5 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-800 rounded shadow-md justify-start content-start flex-col w-full max-w-16"
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={item.title}
                            key={`${item.url}-${index}`}
                          >
                            <div className="flex self-center">
                              <img
                                className="lazyload object-cover m-avatar w-20 h-20 dark:filter-60 rounded-full bg-white max-w-full border-2 border-white border-solid no-zoom"
                                data-src={`${
                                  item.avatar || "https://www.gatsbyjs.com/icons/icon-512x512.png"
                                }`}
                                src={`${
                                  item.avatar || "https://www.gatsbyjs.com/icons/icon-512x512.png"
                                }`}
                                loading="lazy"
                                alt={item.title}
                              />
                            </div>
                            <div className="my-1.5 mx-3.5 flex flex-col text-center bg-white dark:bg-gray-800">
                              <p className="pt-3 pb-1.5 font-semibold text-gray-800 dark:text-gray-300">
                                {item.title}
                              </p>
                              <div className="py-1.5 break-all flex items-center bg-white dark:bg-gray-800">
                                <p
                                  className="inline-block w-full text-gray-600 dark:text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap break-words m-0 text-center"
                                  title={item.description}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </SiteInfoProvider.Consumer>
    </Layout>
  );
};

export default Links;
