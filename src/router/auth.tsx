import Loaders from "@/components/loading/loaders";
import DashboardLayouts from "@/layouts/dashboard";
import React from "react";
import { RouteObject } from "react-router-dom";

const DashboardPages = React.lazy(
  () => import("@/features/dashboard/pages/dashboard")
);

export const route_auth: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardLayouts />,
    children: [
      {
        path: "",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <DashboardPages />
          </React.Suspense>
        ),
      },
    ],
  },
];
