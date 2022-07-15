import React from "react";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer
      className="footer py-8 text-center shadow-md dark:bg-gray-800"
      style={{ flex: "flex: 0 0 auto" }}
      id="footer"
    >
      <div className="my-0 px-10 grid lg:grid-cols-2 md:grid-cols-1">
        <div className="offsite-links flex flex-row justify-center flex-wrap items-center">
          <a
            href="https://github.com/ufec"
            className="circle p-2 m-2.5 hover:text-red-600  bg-transparent border border-gray-100 rounded-full text-gray-500 inline-block relative cursor-pointer w-10 h-10"
            target="_blank"
            rel="noopener"
            title="Github"
          >
            <svg
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1760"
            >
              <path
                d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
                p-id="1761"
              ></path>
            </svg>
          </a>
          <a
            href="mailto:blog@ufec.cn"
            className="circle p-2 m-2.5 hover:text-red-600  bg-transparent border border-gray-100 rounded-full text-gray-500 inline-block relative cursor-pointer w-10 h-10"
            target="_blank"
            rel="noopener"
            title="邮箱"
          >
            <svg
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2625"
            >
              <path
                d="M512 576a32 32 0 0 1-17.184-4.992L128 337.568v430.656A64 64 0 0 0 192.064 832h639.872A64 64 0 0 0 896 768.224V337.888l-366.816 233.12A32.096 32.096 0 0 1 512 576"
                p-id="2626"
              ></path>
              <path
                d="M831.936 192H192.064A64 64 0 0 0 128 255.808v4.896l384 245.376 384-244.032v-6.24A64 64 0 0 0 831.936 192"
                p-id="2627"
              ></path>
            </svg>
          </a>
          <a
            href="/sitemap-index.xml"
            className="circle p-2 m-2.5 hover:text-red-600  bg-transparent border border-gray-100 rounded-full text-gray-500 inline-block relative cursor-pointer w-10 h-10"
            target="_blank"
            rel="noopener"
            title="订阅"
          >
            <svg
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3503"
            >
              <path
                d="M320.16155 831.918c0 70.738-57.344 128.082-128.082 128.082S63.99955 902.656 63.99955 831.918s57.344-128.082 128.082-128.082 128.08 57.346 128.08 128.082z m351.32 94.5c-16.708-309.2-264.37-557.174-573.9-573.9C79.31155 351.53 63.99955 366.21 63.99955 384.506v96.138c0 16.83 12.98 30.944 29.774 32.036 223.664 14.568 402.946 193.404 417.544 417.544 1.094 16.794 15.208 29.774 32.036 29.774h96.138c18.298 0.002 32.978-15.31 31.99-33.58z m288.498 0.576C943.19155 459.354 566.92955 80.89 97.00555 64.02 78.94555 63.372 63.99955 77.962 63.99955 96.032v96.136c0 17.25 13.67 31.29 30.906 31.998 382.358 15.678 689.254 322.632 704.93 704.93 0.706 17.236 14.746 30.906 31.998 30.906h96.136c18.068-0.002 32.658-14.948 32.01-33.008z"
                fill=""
                p-id="3504"
              ></path>
            </svg>
          </a>
        </div>
        <div className="site-info flex flex-col justify-center">
          <p className="self-center">
            <a
              href="https://www.upyun.com/?utm_source=lianmeng&amp;utm_medium=referral"
              target="blank"
              title="又拍云"
            >
              <img
                src="https://my-static.ufec.cn/blog/2020/04/youpai-1b2eb4eb7b744730a41057a221ef5499.webp"
                alt="又拍云"
                width="48"
              />
            </a>
          </p>
          <div className="badges">
            <div className="github-badge">
              <a
                style={{ color: "#fff" }}
                rel="license"
                href="https://www.gatsbyjs.com"
                target="_blank"
              >
                <span className="badge-subject pr-8 mr-1">Powered</span>
                <span className="badge-value bg-blue">Gatsby</span>
              </a>
            </div>
            <div className="github-badge">
              <a
                style={{ color: "#fff" }}
                rel="license"
                href="https://github.com/ufec/gatsby-theme-xue.git"
                target="_blank"
              >
                <span className="badge-subject pr-8 mr-1">Theme</span>
                <span className="badge-value bg-red">Xue-Gatsby</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
