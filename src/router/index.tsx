import React from "react";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { useRoutes, Navigate } from "react-router-dom";
import { route_auth } from "./auth";
import { route_unauth } from "./unauth";
import { global } from "./global";

const Routes: React.FC = () => {
  const token = useAuthStore((state) => state.users.token);

  const routes = token ? route_auth : route_unauth;

  return useRoutes([
    ...global,
    ...routes,
    {
      path: "*",
      element: <Navigate to={token ? "/" : "/login"} replace />,
    },
  ]);
};

export default Routes;
