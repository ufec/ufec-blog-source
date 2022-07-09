import React from "react";
import { PageInfo } from "../../../types/Common";
import "../../styles/paginate.css";

interface PaginateProps {
  pageInfo: PageInfo;
  prefix: string;
  indexPagePath?: string;
}

/**
 * @props pageInfo PageInfo
 * @props prefix 前缀(跳转页面的前缀)
 * @props indexPagePath 首页路径(页码为1时跳转的路径， 大多数情况下为prefix, 没有特殊情况无需额外指定)
 * @returns
 */
const Paginate = ({ pageInfo, prefix, indexPagePath }: PaginateProps) => {
  if (!indexPagePath) {
    indexPagePath = prefix;
  }
  return (
    <nav
      className="pagination flex flex-row justify-center my-8"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list flex flex-row " id="pagination">
        {pageInfo.hasPreviousPage && (
          <li className="pagination-previous">
            <a
              className="pagination-circle dark:text-gray-300"
              href={
                pageInfo.currentPage === 2 ? indexPagePath : `${prefix}/${pageInfo.currentPage - 1}`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </a>
          </li>
        )}
        {pageInfo.hasNextPage && (
          <li className="pagination-next">
            <a
              className="pagination-circle dark:text-gray-300"
              href={`${prefix}/${pageInfo.currentPage + 1}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Paginate;
