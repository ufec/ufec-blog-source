import React from "react";
import { SiblingsNodeInfo } from "../../../types/Common";
import "../../styles/pageup.css";

interface PageUpProps {
  prev: SiblingsNodeInfo | null | undefined;
  next: SiblingsNodeInfo | null | undefined;
}

const PageUp = ({ prev, next }: PageUpProps) => {
  return (
    <div className="mx-4 md:mx-auto mt-8 max-w-4xl tracking-wider md:leading-relaxed sm:leading-normal">
      <div className="entry-navigation bg-white rounded shadow-md flex flex-wrap mt-10 overflow-hidden w-full">
        <div className="nav flex flex-col justify-center min-h-100 py-0 px-4 relative w-full sm:w-6/12 break-word">
          {prev && (
            <img
              className="lazyload h-full w-full left-0 top-0 object-cover absolute dark:filter-60 no-zoom"
              src={prev?.thumbnail}
              data-src={prev?.thumbnail}
              alt={prev?.title}
              data-loaded="true"
            />
          )}
          <span className="text-white font-medium text-lg pt-8 relative uppercase z-10 dark:text-gray-300">
            上一篇
          </span>
          <h4 className="text-white text-lg mt-1 mx-0 mb-0 pb-8 relative z-10 dark:text-gray-300">
            {prev?.title || "无"}
          </h4>
          {prev && (
            <a
              className="absolute bottom-0 left-0 right-0 top-0 z-10 dark:text-gray-300"
              href={`/${prev?.slug}`}
            ></a>
          )}
        </div>
        <div className="nav items-end text-right flex flex-col justify-center min-h-100 py-0 px-4 relative w-full sm:w-6/12 break-word">
          {next && (
            <img
              className="lazyload h-full w-full left-0 top-0 object-cover absolute dark:filter-60 no-zoom"
              src={
                next?.thumbnail
                  ? next.thumbnail
                  : "https://www.ufec.cn/upload/2020/05/3-012033e2a02c4ea3ab2217546f094f58.png"
              }
              data-src={next?.thumbnail}
              alt={next?.title}
              data-loaded="true"
            />
          )}
          <span className="text-white font-medium text-lg pt-8 relative uppercase z-10 dark:text-gray-300">
            下一篇
          </span>
          <h4 className="text-white text-lg mt-1 mx-0 mb-0 pb-8 relative z-10 dark:text-gray-300">
            {next?.title || "无"}
          </h4>
          {next && (
            <a
              className="absolute bottom-0 left-0 right-0 top-0 z-10 dark:text-gray-300"
              href={`/${next?.slug}`}
            ></a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageUp;
