import React from "react";

export interface BadgeWrapper {
    children: React.ReactNode;
    count?: number;
}

const BadgeWrapper: React.FC<BadgeWrapper> = (props) => {
  return (
    <div className="relative inline-block">
      {props.children}
      <span className="absolute -top-2 -left-2 h-6 w-6 bg-red-500 rounded-full">
        <span className="text-white text-xs font-semibold flex items-center justify-center h-full">
          {props.count}
        </span>
      </span>
    </div>
  );
};

export default BadgeWrapper;
