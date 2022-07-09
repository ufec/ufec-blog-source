import React from "react";

interface CommentProps {
  children: React.ReactNode;
}

const Comments = (props: CommentProps) => {
  return (
    <div className="mx-4 md:mx-auto md-content mt-8 max-w-4xl tracking-wider md:leading-relaxed sm:leading-normal">
      <section className="comments-area">{props.children}</section>
    </div>
  );
};
export default Comments;
