import React, { useEffect } from "react";

interface HeaderImageProps {
  idName?: string;
  imgSrc?: string;
  imgSrcSet?: string;
  sizes?: string;
  title: string;
  author?: string;
  authorLink?: string;
  date?: string;
  number?: number;
  slogan?: string;
  avatar?: string;
}

const HeaderImage = (props: HeaderImageProps) => {
  useEffect(() => {
    document.querySelector(".arrow-down")?.addEventListener("click", () => {
      const scrollHeight =
        (document.querySelector("#hero")?.clientHeight || 0) -
        (document.querySelector("#header")?.clientHeight || 0);
      if (scrollHeight > 0) {
        window.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      }
    });
    return () => {
      document.querySelector(".arrow-down")?.removeEventListener("click", () => {});
    };
  });

  const postHeader = (
    <>
      <h2 className="text-white mb-5 mt-4 leading-loose relative w-full text-2xl md:text-4xl text-center dark:text-gray-300">
        {props.title}
      </h2>
      <div className="text-white text-center">
        <span>
          <svg
            width={17}
            height={17}
            className="inline-block fill-white"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3150"
          >
            <path
              d="M901.513318 911.112953c0.004093 0.649799 0.096191 1.27504 0.096191 1.925862l-0.291642 0c-1.509377 21.572318-19.298532 38.657438-41.255613 38.657438-21.956058 0-39.746236-17.08512-41.255613-38.657438l-0.717338 0c0.010233-1.033539 0.153496-2.036379 0.153496-3.074012 0-83.854826-33.293267-159.791309-87.139639-215.417211l0.075725-0.077771c-7.416923-7.259334-12.045337-17.35425-12.045337-28.550243 0-22.084994 17.903765-39.990806 39.98876-39.990806 11.745509 0 22.201651 5.157463 29.518291 13.220093 68.333318 69.115124 111.135146 163.556053 112.677269 268.097014 0.067538 0.976234 0.291642 1.909489 0.291642 2.90312C901.609509 910.479527 901.521504 910.784472 901.513318 911.112953zM512.001023 605.455485c-11.245112 0-22.254863-0.920976-33.135678-2.273786-153.508209 16.661472-273.060049 147.567917-273.100982 306.703287 0 0.090051 0.026606 0.173962 0.026606 0.264013 0 0.047072-0.014326 0.092098-0.014326 0.13917 0.024559 0.923022 0.128937 1.824555 0.137123 2.749624l-0.414439 0c-1.511423 21.572318-19.302625 38.657438-41.257659 38.657438-21.958104 0-39.746236-17.08512-41.255613-38.657438l-0.596588 0c0.002047-160.119791 96.668667-297.541627 234.760768-357.451088-67.552535-48.360428-111.725594-127.296221-111.725594-216.709647 0-147.225109 119.350249-266.573311 266.575358-266.573311S778.576381 191.651948 778.576381 338.877057 659.226133 605.455485 512.001023 605.455485zM512.001023 153.960511c-101.926414 0-184.55225 82.625836-184.55225 184.55225s82.625836 184.55225 184.55225 184.55225 184.554296-82.625836 184.554296-184.55225S613.927437 153.960511 512.001023 153.960511z"
              p-id="3151"
            ></path>
          </svg>
          <a href={props.authorLink}>{props.author}</a>
        </span>
        <span>
          <svg
            width={20}
            height={20}
            className="inline-block fill-white ml-3"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1993"
          >
            <path
              d="M384 128v64h256V128h64v64h192v704H128V192h192V128h64z m448 320H192v384h640V448z m-181.824 40.608l43.648 46.784-205.76 192a32 32 0 0 1-43.648 0l-114.24-106.56 43.648-46.816 92.416 86.208 183.936-171.616zM320 256H192v128h640V256h-128v64h-64V256h-256v64h-64V256z"
              p-id="1994"
            ></path>
          </svg>
          {props.date}
        </span>
      </div>
    </>
  );
  const hero = (
    <>
      <h2 className="text-white dark:text-gray-300 mb-5 mt-4 leading-loose relative w-full text-4xl text-center">
        {props.title}
      </h2>
      <hr className="text-center bg-red-300 h-0.5 border-none w-20 mx-auto -mt-5 mb-3" />
      <p
        className="slogan text-center text-white dark:text-gray-300 text-lg md:text-xl"
        id="slogan"
      >
        {props?.slogan}
      </p>
      <p className="w-full text-4xl absolute bottom-11 text-center">
        <a className="arrow-down z-50 hidden sm:hidden md:block cursor-pointer">
          <span className="text-white dark:text-gray-300 inline-block">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </a>
      </p>
    </>
  );
  const links = (
    <>
      <h2 className="text-white mb-5 mt-4 leading-loose relative w-full text-4xl text-center dark:text-gray-300">
        <img
          className=" object-cover ring-2 ring-white m-avatar w-20 h-20 rounded-full bg-white max-w-full border-2 border-white border-solid mx-auto no-zoom"
          src={props?.avatar}
          alt={props.title}
        />
      </h2>
      <p className="slogan text-white dark:text-gray-300 text-lg md:text-xl text-center">
        {props?.slogan}
      </p>
    </>
  );
  return (
    <header
      id={props.idName}
      className={`bg-gray-900 table fade-down relative w-full opacity-95 z-10 h-1/2 ${
        props.idName === "hero" && "sm:h-1/2 md:h-screen full-screen"
      }`}
    >
      {props?.imgSrc ? (
        <div className="cover-bg bottom-0 left-0 right-0 top-0 opacity-30 absolute">
          <img
            className="h-full w-full left-0 object-cover absolute top-0 dark:filter-60 no-zoom"
            src={props?.imgSrc}
            alt={props.title}
            srcSet={props?.imgSrcSet || ""}
            sizes={props?.sizes || ""}
          />
        </div>
      ) : (
        <div className="placeholder-bg"></div>
      )}
      <div className="h-96 align-middle table-cell relative w-full">
        {props?.idName === "postHeader" ? (
          postHeader
        ) : props?.idName === "hero" ? (
          hero
        ) : props?.idName === "links" ? (
          links
        ) : (
          <h2 className="text-white mb-5 mt-4 leading-loose relative w-full text-4xl text-center dark:text-gray-300">
            {props.title}
            {props?.number && <sup>{props.number}</sup>}
          </h2>
        )}
      </div>
    </header>
  );
};

export default HeaderImage;
