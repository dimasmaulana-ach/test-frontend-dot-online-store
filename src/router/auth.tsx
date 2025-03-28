import Loaders from "@/components/loading/loaders";
import DashboardLayouts from "@/layouts/dashboard";
import LandingLayouts from "@/layouts/landing";
import React from "react";
import { RouteObject } from "react-router-dom";

const UsersPages = React.lazy(
  () => import("@/features/users/pages/users")
);
const LandingPages = React.lazy(
  () => import("@/features/landing/pages/landing")
);
const TaskManagementPages = React.lazy(
  () => import("@/features/task-management/pages/task-board")
);

export const route_auth: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayouts />,
    children: [
      {
        path: "",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <LandingPages />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "",
    element: <DashboardLayouts />,
    children: [
      {
        path: "/users",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <UsersPages />
          </React.Suspense>
        ),
      },
      {
        path: "/task-management",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <TaskManagementPages />
          </React.Suspense>
        ),
      }

    ],
  },
];
