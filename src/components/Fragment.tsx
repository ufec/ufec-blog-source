import React from "react";

interface FragmentProps {
  children: React.ReactChildren;
}

const Fragment = ({ children }: FragmentProps) => {
  return <>{children}</>;
};

export default Fragment;
