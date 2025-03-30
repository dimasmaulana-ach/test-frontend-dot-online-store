import Loaders from "@/components/loading/loaders";
import LandingLayouts from "@/layouts/landing";
import NoLayouts from "@/layouts/no-layouts";
import React from "react";
import { RouteObject } from "react-router-dom";

const LoginPages = React.lazy(() => import("@/features/auth/pages/login"));
const RegisterPages = React.lazy(
  () => import("@/features/auth/pages/register")
);
const ProductListPages = React.lazy(() => import("@/features/product/pages/index"));
const ProductDetailsPages = React.lazy(() => import("@/features/product/pages/details"));

export const route_unauth: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayouts />,
    children: [
      {
        path: "/",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <ProductListPages />
          </React.Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <ProductDetailsPages />
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
