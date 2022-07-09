import { graphql, useStaticQuery } from "gatsby";
import React, { ReactNode, useEffect, useState } from "react";
import { Site, SiteInfoProvider } from "../../../types/Common";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import SEO, { SEOProps } from "../seo/SEO";

interface LayoutProps {
  children: ReactNode;
  location: Location;
  seoProps?: SEOProps;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const data: Site = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          owner
          title
          siteUrl
          description
        }
      }
    }
  `);
  const [showBack2Top, setShowBack2Top] = useState(false); // 是否显示回到顶部按钮，默认不显示
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight >> 1) {
      setShowBack2Top(true);
    }
    if (window.scrollY < window.innerHeight >> 1) {
      setShowBack2Top(false);
    }
  };
  useEffect(() => {
    if (document.documentElement.scrollTop > 100 && !showBack2Top) {
      setShowBack2Top(true);
    }
    document.addEventListener("scroll", handleScroll, false);
    return () => {
      document.removeEventListener("scroll", handleScroll, false);
    };
  }, []);

  return (
    <SiteInfoProvider.Provider value={data}>
      <SEO {...props.seoProps}></SEO>
      <Header location={props.location}></Header>
      <main className="bg-gray-50 dark:bg-gray-900" style={{ flex: "1 0 auto" }}>
        {props.children}
      </main>
      <Footer></Footer>
      <div
        className={`back-2-top fixed right-12 bottom-48 z-50 ${!showBack2Top && "hidden"}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div className="relative w-16 h-16 rounded-full shadow-md bg-white dark:bg-gray-600 cursor-pointer text-center">
          <span className="text-3xl text-gray-500 dark:text-gray-300 w-16 h-16 -transform-half inline-flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
            </svg>
          </span>
        </div>
      </div>
    </SiteInfoProvider.Provider>
  );
};

export default Layout;
