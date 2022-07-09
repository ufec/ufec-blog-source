import React from "react";

interface TagProps {
  tagName: string;
  tagUrl: string;
  showNumber?: boolean;
  postCount?: number;
}

const Tag = ({ tagName, tagUrl, showNumber, postCount }: TagProps) => {
  return (
    <a
      href={tagUrl}
      className="bg-gray-200 hover:shadow-md hover:text-white hover:bg-red-400 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-red-400 dark:hover:shadow-md dark:hover:text-white mt-2 mb-2 mr-2 block py-0 px-4 rounded leading-10 h-10 text-gray-800 no-underline"
      style={showNumber ? { textDecoration: "none !important" } : undefined}
    >
      #&nbsp;{tagName} {showNumber && postCount != 0 && <span className="ml-4">{postCount}</span>}
    </a>
  );
};

export default Tag;
