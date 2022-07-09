import * as React from "react";
import SEO from "../components/seo/SEO";

const NotFoundPage = () => {
  return (
    <main className="absolute h-full w-full bg-white">
      <SEO title="404 Page Not Found" />
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className=" text-9xl font-bold text-center">404</h1>
        <h2 className="text-xl text-center">Page Not Found 我好像没来得及写啊</h2>
        <a
          href="/"
          className="mt-2 inline-block whitespace-nowrap cursor-pointer select-none h-9 text-center"
          style={{
            border: "2px solid #7b8993",
            padding: "0 25px",
            color: "#7b8993",
            fontSize: ".875rem",
            lineHeight: "2.25rem",
            height: "2.25rem",
            borderRadius: "1.5625rem",
          }}
        >
          Go Home
        </a>
      </div>
    </main>
  );
};

export default NotFoundPage;
