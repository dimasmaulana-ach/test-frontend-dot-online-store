import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

interface MenuProps {
  children: React.ReactNode;
  options: { item: React.ReactNode; onClick: () => void }[];
}

const Menu: React.FC<MenuProps> = ({ children, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md"
      >
        {children}
        <Icon path={mdiChevronDown} />
      </button>

      <div
        className={clsx(
          "absolute left-0 mt-2 w-48 bg-primary-100 shadow-lg rounded-md border border-support-100/30 transition-all duration-200 ",
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              option.onClick();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 cursor-pointer transition-colors"
          >
            {option.item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
