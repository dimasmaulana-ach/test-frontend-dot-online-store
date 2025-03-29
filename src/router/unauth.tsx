import Loaders from "@/components/loading/loaders";
import LandingLayouts from "@/layouts/landing";
import NoLayouts from "@/layouts/no-layouts";
import React from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router-dom";

const LoginPages = React.lazy(() => import("@/features/auth/pages/login"));
const RegisterPages = React.lazy(
  () => import("@/features/auth/pages/register")
);
const ProductPages = React.lazy(() => import("@/features/product/pages/index"));

export const route_unauth: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayouts />,
    children: [
      {
        path: "/",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <ProductPages />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <NoLayouts />,
    children: [
      {
        path: "/login",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <LoginPages />
          </React.Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <RegisterPages />
          </React.Suspense>
        ),
      },
    ],
  },
];
