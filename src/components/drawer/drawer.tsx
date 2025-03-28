import React from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";

interface DrawerProps {
  /**
   * Indicates whether the drawer is open or closed.
   * @default false
   */
  isOpen: boolean;

  /**
   * Function to close the drawer.
   */
  onClose: () => void;

  /**
   * Placement of the drawer.
   * @default "left"
   */
  placement?: "top" | "left" | "bottom" | "right";

  /**
   * Content to be displayed inside the drawer.
   */
  children: React.ReactNode;

  /**
   * Additional class names for styling.
   */
  className?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = "left",
  children,
  className,
}) => {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-50 transition-opacity",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        className
      )}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20 bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Drawer Content */}
      <div
        className={clsx(
          "fixed bg-primary-100 shadow-lg transition-all duration-300 w-full md:w-96 h-full",
          placement === "right" && "right-0 top-0 translate-x-full",
          placement === "left" && "left-0 top-0 -translate-x-full",
          placement === "top" && "top-0 left-0 w-full h-64 -translate-y-full",
          placement === "bottom" &&
            "bottom-0 left-0 w-full h-64 translate-y-full",
          isOpen && "translate-x-0 translate-y-0"
        )}
      >
        <button className="absolute top-3 right-3 text-xl" onClick={onClose}>
          &times;
        </button>
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Drawer;
