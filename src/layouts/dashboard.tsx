

import { useDashboardRouter } from "@/features/dashboard/hooks/useDashboardRouter";
import { useSidebarHandler } from "@/features/dashboard/hooks/useSidebarHandler";
import ThemeToggleButton from "@/features/theme/components/theme-toggle";
import { mdiChevronRight, mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayouts: React.FC = () => {
  const { route, generateBreadcrumbs } = useDashboardRouter();
  const { sidebar, toggleSidebar } = useSidebarHandler();
  const { pathname } = window.location;

  return (
    <div className="flex flex-row h-screen w-screen bg-primary-100 transition-all duration-300">
      {/* Sidebar */}
      <div
        className={clsx(
          "h-screen transition-all duration-300 border-r border-support-200/30 ",
          sidebar === "hide" ? "w-[6vw]" : "w-[20vw]"
        )}
      >
        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-col gap-2">
            {route.map((item) => (
              <Link
                key={item.name}
                className={clsx(
                  "w-full text-start transition-all duration-300 flex items-center  rounded-md p-2",
                  pathname === item.path
                    ? "text-primary-100 bg-support-100"
                    : "text-support-100 hover:bg-support-200 hover:text-primary-100",
                  sidebar === "hide" ? "justify-center" : "justify-start gap-2"
                )}
                to={item.path}
              >
                <Icon path={item.icon} size={1} />
                <p
                  className={clsx(
                    "whitespace-nowrap overflow-hidden transition-all duration-300",
                    sidebar === "hide" ? "!w-0 opacity-0" : "w-auto opacity-100"
                  )}
                >
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={clsx(
          "h-screen transition-all duration-300",
          sidebar === "hide" ? "w-[94vw]" : "w-[80vw]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[8vh] p-3 border-b border-support-200/30 bg-primary-100 text-support-100 transition-all duration-300">
          <div className="flex items-center gap-2">
            <button className="btn-icon-outline" onClick={toggleSidebar}>
              <Icon
                path={mdiChevronRight}
                size={1}
                className={clsx(
                  "transition-transform duration-300",
                  sidebar === "hide" ? "rotate-0" : "rotate-180"
                )}
              />
            </button>
            <h1 className="text-xl flex items-center gap-1">
              {generateBreadcrumbs().map((item, index) => (
                <span key={index} className="flex items-center gap-1">
                  {item.name}
                  {index !== generateBreadcrumbs().length - 1 && (
                    <Icon path={mdiChevronRight} size={1} />
                  )}
                </span>
              ))}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <button className="btn-icon-outline">
              <Icon path={mdiLogout} size={1} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[92vh] p-3 text-support-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// const DashboardLayouts: React.FC = () => {
//   const { route, generateBreadcrumbs } = useDashboardRouter();
//   const { sidebar, toggleSidebar } = useSidebarHandler();
//   const { pathname } = window.location;
//   return (
//     <div className="flex flex-row h-screen w-screen bg-primary-100 transition-all duration-300">
//       <div>
//         <div
//           className={clsx(
//             "h-screen w-[20vw] text-support-100 border-r-[1px] border-support-200/30",
//             sidebar === "hide" ? "!w-[6vw]" : "w-[20vw]"
//           )}
//         >
//           <div className="flex flex-col gap-5 p-5">
//             <div className="flex flex-col gap-2">
//               {route.map((item) => (
//                 <Link
//                   key={item.name}
//                   className={clsx(
//                     "w-full text-start transition-all duration-300 flex items-center gap-2",
//                     pathname === item.path
//                       ? "text-primary-100 bg-support-100 rounded-md p-2"
//                       : "text-support-100 hover:bg-support-100 hover:text-primary-100 rounded-md p-2",
//                     sidebar === "hide" ? "justify-center" : "justify-start"
//                   )}
//                   to={item.path}
//                 >
//                   <Icon path={item.icon} size={1} />
//                   <p
//                     className={clsx(
//                       "md:block hidden",
//                       sidebar === "hide" ? "!hidden" : ""
//                     )}
//                   >
//                     {item.name}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="">
//         <div
//           className={clsx(
//             "w-[80vw] h-screen border-r-[1px] border-support-200 bg-primary-100 text-support-100 transition-all duration-300",
//             sidebar === "hide" ? "!w-[94vw]" : "w-[80vw]"
//           )}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between h-[8vh] p-3 border-b-[1px] border-support-200/30 bg-primary-100 text-support-100 transition-all duration-300">
//             <div className="flex justify-center items-center gap-2">
//               <button className="btn-icon-outline" onClick={toggleSidebar}>
//                 <Icon path={mdiChevronRight} size={1} className="rotate-180" />
//               </button>
//               <h1 className="text-xl">
//                 {generateBreadcrumbs().map((item, index) => (
//                   <span key={index}>
//                     {item.name}
//                     {index !== generateBreadcrumbs().length - 1 && (
//                       <Icon path={mdiChevronRight} size={1} />
//                     )}
//                   </span>
//                 ))}
//               </h1>
//             </div>
//             <div className="flex items-center gap-2">
//               <ThemeToggleButton />
//               <button className="btn-icon-outline">
//                 <Icon path={mdiLogout} size={1} />
//               </button>
//             </div>
//           </div>
//           {/* Content */}
//           <div className="overflow-y-auto h-[92vh] p-3">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default DashboardLayouts;
