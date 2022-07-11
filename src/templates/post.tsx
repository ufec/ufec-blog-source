import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import { PostData } from "../../types/PostData";
import { SiteInfoProvider } from "../../types/Common";
import Layout from "../components/layout/Layout";
import MarkdownRender from "../components/MarkdownRender";
import PageUp from "../components/pageup/PageUp";
import Tag from "../components/tag/Tag";
import HeaderImage from "../components/HeaderImage/HeaderImage";
import AuthorsFile from "../../content/authors.yaml";
import "../styles/post.css"; // 文章页面样式
import "katex/dist/katex.min.css"; //数学公式样式
import "../styles/toc.css"; // 目录样式

interface PostTemplateProps {
  location: Location;
  data: PostData;
}

interface PostHeaderImage {
  src?: string;
  srcSet?: string;
  sizes?: string;
}

interface Authors {
  [key: string]: {
    name: string;
    url: string;
  };
}

const PostTemplate = ({ data, location }: PostTemplateProps) => {
  const { frontmatter, fields } = data.markdownRemark;
  const [showToc, setShowToc] = useState(false);
  const [fixedToc, setFixedToc] = useState(false);
  const [allTitle, setAllTitle] = useState<NodeListOf<HTMLHeadingElement>>();
  const [headerImage, setHeaderImage] = useState<PostHeaderImage>();
  const authors: Authors = AuthorsFile;
  let adsbygoogle = null;
  // 点击目录、标题锚点时，固定目录
  const linkToHeader = (anchor: HTMLAnchorElement) => {
    anchor.onclick = () => {
      const href = anchor.getAttribute("href");
      if (href) {
        // location.hash = href; // 直接修改会导致页面滚动，虽然也能达到目的，但是页面会上下滚一下不丝滑
        history.replaceState(null, "", `${location.pathname}${href}`); // 退而求其次，替换历史记录，达到目的
        const anchorElement = document.querySelector(window.decodeURI(href)) as HTMLElement;
        window.scroll({ top: anchorElement.offsetTop - 56, behavior: "smooth" });
      }
      return false; // 阻止默认行为
    };
  };

  // 获取滚动条距浏览器顶部的距离
  const getScrollTop = () => document.documentElement.scrollTop || document.body.scrollTop;

  // 判断是否需要展示目录
  const isShowToc = () => {
    if (getScrollTop() > (document.querySelector("#postHeader")?.clientHeight || 336) / 2) {
      setShowToc(true);
    } else {
      setShowToc(false);
    }
  };

  // 监听滚动事件
  const handleScroll = (ev: Event) => {
    isShowToc();
    const articleElement = document.querySelector(".article-content") as HTMLElement;
    const mdContentElement = document.querySelector(".md-content") as HTMLElement;
    const tocElement = document.querySelector(".toc") as HTMLElement;
    const articleOffsetTop = articleElement.offsetTop + mdContentElement.clientHeight; // 文章区域底部距离浏览器顶部的高度
    if (getScrollTop() > articleOffsetTop - (window.innerHeight + tocElement.clientHeight) / 2) {
      setFixedToc(true);
    } else {
      setFixedToc(false);
    }
  };

  useEffect(() => {
    // 获取文章正文中第一张图片
    const postFirstImage = document.querySelector(".md-content img") as HTMLImageElement;
    if (frontmatter.thumbnail) {
      setHeaderImage({
        src: frontmatter.thumbnail,
      });
    } else if (postFirstImage) {
      setHeaderImage({
        src: postFirstImage.src,
      });
    }

    setAllTitle(
      document.querySelectorAll<HTMLHeadingElement>(
        ".md-content h1, .md-content h2, .md-content h3, .md-content h4, .md-content h5, .md-content h6"
      )
    );
    // 为悬浮目录、headingElement后的连接绑定事件，统一处理滚动
    document
      .querySelectorAll<HTMLAnchorElement>(".anchor")
      .forEach((anchor) => linkToHeader(anchor));
    document
      .querySelectorAll<HTMLAnchorElement>(".toc > ul > li a")
      .forEach((anchor) => linkToHeader(anchor));
    // 存在锚点时，自动滚动到锚点位置 并同步浮动目录
    if (location.hash !== "") {
      const hash = window.decodeURI(location.hash);
      const headingElement = document.querySelector(hash) as HTMLHeadingElement;
      window.scroll({ top: headingElement.offsetTop - 56, behavior: "smooth" });
      // 同步浮动目录
      const tocAnchor = document.querySelector(
        `.toc > ul > li [href="${hash}"]`
      ) as HTMLAnchorElement;
      if (tocAnchor && !tocAnchor.classList.contains("active")) {
        tocAnchor.classList.add("active");
      }
    }
    isShowToc();
    const googleADScript = document.createElement("script");
    googleADScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2963978385376550";
    googleADScript.async = true;
    googleADScript.crossOrigin = "anonymous";
    document.body.appendChild(googleADScript);
    adsbygoogle = window?.adsbygoogle || [];
    adsbygoogle.push({});
    allTitle?.forEach((headingElement: HTMLHeadingElement) => {
      // io.observe(headingElement);
      // console.log(headingElement);
    });
  }, []);

  useEffect(() => {
    // 跳过第一次渲染时的调用
    if (allTitle) {
      // useEffect会在每次渲染后执行，上一个useEffect执行时对allTitle赋值会触发当前useEffect，从而保证handleScroll中的allTitle是最新的且有值
      window.addEventListener("scroll", handleScroll, false);
      return () => {
        window.removeEventListener("scroll", handleScroll, false);
      }; // 移除监听
    }
  }, [allTitle]);

  return (
    <Layout location={location} seoProps={{ title: frontmatter.title, description: data.markdownRemark.excerpt, author: frontmatter.author?.length > 0 ? frontmatter.author[0] : undefined}}>
      <SiteInfoProvider.Consumer>
        {(siteInfo) => (
          <div className="mx-auto" id="container">
            <HeaderImage
              idName="postHeader"
              title={frontmatter.title}
              imgSrc={headerImage?.src}
              imgSrcSet={headerImage?.srcSet}
              sizes={headerImage?.sizes}
              author={
                frontmatter?.author
                  ? authors[frontmatter.author[0]].name
                  : siteInfo.site.siteMetadata.owner
              }
              authorLink={frontmatter?.author ? authors[frontmatter.author[0]].url : "/1111"}
              date={frontmatter.date}
            />
            <article className="article-content fade-up">
              <div className="mx-auto bg-white dark:bg-gray-800 rounded-md px-10 py-10 md-content mt-8 max-w-4xl tracking-wider md:leading-relaxed sm:leading-normal heti text-gray-800 dark:text-gray-300">
                <MarkdownRender htmlAst={data.markdownRemark.htmlAst}></MarkdownRender>
                <hr className="bg-gray-100 dark:bg-gray-700 "></hr>
                <p className="flex flex-row justify-start flex-wrap">
                  {frontmatter?.tags?.map((tag) => {
                    return <Tag key={tag} tagName={tag} tagUrl={`/tags/${tag}`}></Tag>;
                  })}
                </p>
                <hr className="bg-gray-100 dark:bg-gray-700 "></hr>
                <a href={fields.sourceFileUrl}>编辑此页面</a>
              </div>
              <div id="tocFlag"></div>
              <aside
                id="toc"
                className={`toc ${fixedToc ? "toc-right-fixed" : ""}`}
                style={{ display: showToc ? "block" : "none" }}
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }}
              ></aside>
            </article>
            <ins className="adsbygoogle"
                style={{display:"block", textAlign:"center"}}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-2963978385376550"
                data-ad-slot="8158849947"
            >      
            </ins>
            <PageUp prev={fields?.prev} next={fields?.next}></PageUp>
          </div>
        )}
      </SiteInfoProvider.Consumer>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query ArchiveBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        createdAt
        updatedAt
        sourceFileUrl
        slug
        next {
          ...NodeInfoFragment
        }
        prev {
          ...NodeInfoFragment
        }
      }
      frontmatter {
        title
        author
        date(formatString: "YYYY-MM-DD")
        updated(formatString: "YYYY-MM-DD")
        url
        categories
        tags
        thumbnail
      }
      wordCount {
        words
        sentences
        paragraphs
      }
      tableOfContents(maxDepth: 3)
      timeToRead
      htmlAst
      excerpt
    }
  }
  fragment NodeInfoFragment on SiblingsNodeInfo {
    id
    slug
    thumbnail
    title
  }
`;
