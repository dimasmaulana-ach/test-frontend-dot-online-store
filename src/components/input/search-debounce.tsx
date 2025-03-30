import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface InputSearchDebounceProps {
  defaultValue: string;
  onChange: (val: string) => void;
  className?: string;
}
const InputSearchDebounce: React.FC<InputSearchDebounceProps> = (props) => {
  const [search, setSearch] = useState(props.defaultValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      props.onChange(search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <div>
      <div className="relative flex items-center w-full">
        <Icon path={mdiMagnify} size={1} className="absolute left-3 text-support-100" />
        <input
          type={"text"}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          defaultValue={props.defaultValue}
          placeholder={"Search"}
          className={clsx(
            "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-primary-100 transition-all duration-300",
            props.className
          )}
          style={{
            paddingLeft: "2.5rem",
          }}
        />
      </div>
    </div>
  );
};

export default InputSearchDebounce;
