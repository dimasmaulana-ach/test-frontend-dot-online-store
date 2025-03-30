import Loaders from "@/components/loading/loaders";
import LandingLayouts from "@/layouts/landing";
import React from "react";
import { RouteObject } from "react-router-dom";

const ProductListPages = React.lazy(
  () => import("@/features/product/pages/index")
);
const ProductDetailsPages = React.lazy(
  () => import("@/features/product/pages/details")
);

export const global: RouteObject[] = [
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
];
