import React from "react";
import { Helmet } from "react-helmet";
import { Site, SiteInfoProvider } from "../../../types/Common";

export interface SEOProps {
  lang?: string;
  title?: string;
  description?: string;
  author?: string;
}

const SEO = ({ lang, title, description, author }: SEOProps) => {
  return (
    <SiteInfoProvider.Consumer>
      {(data: Site) => (
        <Helmet htmlAttributes={{ lang }}>
          <title>
            {title ? `${title} | ${data.site.siteMetadata.title}` : data.site.siteMetadata.title}
          </title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content={author ? author : data.site.siteMetadata.owner} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
        </Helmet>
      )}
    </SiteInfoProvider.Consumer>
  );
};

SEO.defaultProps = {
  lang: "zh-CN",
  title: "",
  description: "",
  author: "",
};

export default SEO;
