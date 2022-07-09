import React from "react";
import rehypeReact from "rehype-react";
import { HTMLAst } from "../../types/Common";

export interface MarkdownRenderProps {
  htmlAst: HTMLAst;
}

const renderAst = new (rehypeReact as any)({
  createElement: React.createElement,
  Fragment: React.Fragment, // createElement 默认是div，但必须存在，指定此字段便可以使用Fragment包裹解析htmlAst后的结果
}).Compiler;

const MarkdownRender = ({ htmlAst }: MarkdownRenderProps) => {
  // TODO:其他功能
  return <>{renderAst(htmlAst)}</>;
};

export default MarkdownRender;
