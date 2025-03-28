import React from "react";

export interface PreviewProps {
  title: string;
  children: React.ReactNode;
}

const Preview: React.FC<PreviewProps> = (props) => {
  return (
    <div>
      <div className="text-sm font-medium text-support-100/50">{props.title}</div>
      <div className="text-base text-support-100">{props.children}</div>
    </div>
  );
};

export default Preview;
