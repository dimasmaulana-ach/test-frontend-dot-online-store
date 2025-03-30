import BadgeWrapper from "@/components/badge/badge-wrapper";
import Menu from "@/components/menu/menu";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { useCartCount } from "@/features/cart/hooks/useCartCount";
import ThemeToggleButton from "@/features/theme/components/theme-toggle";
import { mdiCartOutline } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const LandingLayouts: React.FC = () => {
  const { users, clearUsers } = useAuthStore();
  const { data } = users.token ? useCartCount() : { data: { count: 0 } };

  return (
    <div className="text-support-100">
      <div className="sticky top-0 bg-primary-100 border-b-2 border-primary-200 p-4 flex justify-center items-center duration-300 transition-all z-50">
        <div className="flex justify-between items-center md:w-3/4 w-full gap-4">
          <Link to={"/"}>
            <h1 className="font-semibold text-xl">Online.Store</h1>
          </Link>

          <div className="flex gap-4 items-center">
            <div className={clsx(users.token ? "" : "hidden")}>
              <BadgeWrapper count={data?.count}>
                <Link to="/cart" className="btn-icon-outline">
                  <Icon path={mdiCartOutline} size={1} />
                </Link>
              </BadgeWrapper>
            </div>
            <ThemeToggleButton />
            {users.token ? (
              <Menu
                options={[
                  {
                    item: "Logout",
                    onClick: () => {
                      clearUsers();
                    },
                  },
                ]}
              >
                <div className="flex gap-2 items-center">
                  <div className="h-9 w-9 rounded-full bg-primary-100 border border-support-100 text-support-100 font-semibold text-sm flex items-center justify-center">
                    {users.name[0]}
                  </div>
                  <p className="md:block hidden">{users.name}</p>
                </div>
              </Menu>
            ) : (
              <Link to="/login" className="btn-primary px-4">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default LandingLayouts;
