import React from "react";

interface ArticleProps {
  title: string;
  src?: string;
  srcSet?: string;
  sizes?: string;
  slug: string;
  location: Location;
  tags: Array<string>;
  date: string;
  thumbnail?: string;
}

interface TagOnCardProps {
  url: string;
  name: string;
}

const TagOnCard = ({ url, name }: TagOnCardProps) => {
  return (
    <a href={url} className="relative inline-block badge mr-2 mb-1">
      <i
        className="bg-red-400 opacity-10 absolute top-0 left-0 w-full h-full"
        style={{ backgroundColor: "#cfd3d7" }}
      ></i>
      <span
        className="badge-outline text-red-400 h-5 px-2 py-0.5 rounded-sm cursor-pointer"
        style={{ color: "#cfd3d7" }}
        data-value={name}
      >
        {name}
      </span>
    </a>
  );
};

const Card = (props: ArticleProps) => {
  const url = `/${props.slug}`;
  return (
    <div className="relative flex flex-col slide-up overflow-hidden rounded-lg w-full bg-base-100 shadow-xl mt-4">
      <figure className="flex items-center justify-center h-56 cursor-pointer">
        <a href={url} className="w-full">
          {props?.src ? (
            <img
              className="lazyload object-cover w-full h-56 no-zoom"
              data-loaded="true"
              src={props?.src}
              data-src={props?.src}
              srcSet={props?.srcSet}
              alt={props.title}
            />
          ) : (
            <span className="full-image placeholder-bg w-full h-56" role="img" aria-label=""></span>
          )}
        </a>
      </figure>
      <div className="flex flex-col gap-2 px-4 py-6 bg-white dark:bg-gray-800">
        <div className="text-sm h-10 overflow-hidden">
          {props.tags.map((tag) => {
            return <TagOnCard url={`/tags/${tag}`} name={tag} key={tag} />;
          })}
        </div>
        <h2 className="flex items-center gap-2 text-xl leading-7 mb-2 mt-3  z-50">
          <a href={url} className="text-gray-800 dark:text-gray-300">
            {props.title}
          </a>
        </h2>
        <div className="grad grid-cols-2 text-sm">
          <div className="inline-block text-gray-500">
            <span>{props.date}</span>
          </div>
          <div className="inline-block float-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
