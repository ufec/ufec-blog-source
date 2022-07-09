import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    owner: "ufec",
    title: "Code Life",
    siteUrl: "https://ufec.github.io",
    description: "The show must go on",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-postcss",
    // 文件系统
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content`,
      },
      __key: "content",
    },
    {
      resolve: "gatsby-plugin-image",
    },
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        // useMozJpeg: false, // 质量更好 构建速度更慢
        // stripMetadata: true, // 去除EXIF、ICC信息
        // defaultQuality: 80,
        defaults: {
          // quality: 75,
          // breakpoints: [1080],
          backgroundColor: "transparent",
          formats: ["webp"],
        },
      },
    },
    {
      resolve: "gatsby-transformer-sharp",
      options: {
        // 因此当您在查询中使用 .gif 时会引发警告。您需要publicURL改用。使用此选项，您可以禁用警告行为。 The option defaults to true
        checkSupportedExtensions: false,
      },
    },
    // remark
    {
      resolve: "gatsby-transformer-remark",
      options: {
        footnotes: true, // 开启脚注
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              offsetY: 56,
              removeAccents: false,              
              maintainCase: false,
              isIconAfterHeader: true,
              elements: ["h1", "h2", "h3", "h4", "h5", "h6"],
            },
          },
          {
            resolve: "gatsby-remark-vscode",
            options: {
              theme: {
                default: 'Solarized Light',
                dark: 'One Dark Pro',
                parentSelector: {
                  "body.dark": 'One Dark Pro',
                }
              },
              inlineCode: {
                marker: "·",
              },
              extensions: [`${__dirname}/vender/one-dark-pro-theme.vsix`],
            },
          },
          {
            resolve: "gatsby-remark-katex",
            // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
            options: {},
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 690,
              linkImagesToOriginal: false, // 点击图片在新标签页打开图片链接
              wrapperStyle: "margin-bottom: 1.0725rem;", //
              loading: "lazy", // lazy | eager
              showCaptions: true, // 展示图片的标题或者alt
              // quality: 90, // 图片质量
              // disableBgImageOnAlpha: true, // 当图片的背景色为透明色时，不加载背景图片
              // disableBgImage: true, // 不加载图片的背景图片
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: (f: { name: string; hash: string }) =>
                `downloads/files/${f.hash}/${f.name}`,
            },
          },
        ],
      },
    },
    // pwa manifest
    {
      // https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
        name: `Code Life`,
        short_name: `Ufec`,
        description: "The show must go on",
        lang: "zh-CN",
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
      },
    },
    // pwa offline
    {
      resolve: "gatsby-plugin-offline",
      options: {
        precachePages: ["**/*", "/archives/*"],
      },
    },
    // sitemap
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/",
      },
    },
    // 无sourcemap
    {
      resolve: "gatsby-plugin-no-sourcemaps",
    }
  ],
};

export default config;
