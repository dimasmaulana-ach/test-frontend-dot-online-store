import Loaders from "@/components/loading/loaders";
import DashboardLayouts from "@/layouts/dashboard";
import LandingLayouts from "@/layouts/landing";
import React from "react";
import { RouteObject } from "react-router-dom";

const DashboardPages = React.lazy(
  () => import("@/features/dashboard/pages/dashboard")
);
const LandingPages = React.lazy(
  () => import("@/features/landing/pages/landing")
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
