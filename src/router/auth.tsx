import Loaders from "@/components/loading/loaders";
import LandingLayouts from "@/layouts/landing";
import React from "react";
import { RouteObject } from "react-router-dom";
const CartListPages = React.lazy(() => import("@/features/cart/pages/index"));

export const route_auth: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayouts />,
    children: [
      {
        path: "/cart",
        element: (
          <React.Suspense fallback={<Loaders isFullScreen />}>
            <CartListPages />
          </React.Suspense>
        ),
      },
    ],
  },
];
