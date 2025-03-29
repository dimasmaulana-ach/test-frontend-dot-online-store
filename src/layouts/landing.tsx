import InputSearchDebounce from "@/components/input/search-debounce";
import TextInput from "@/components/input/text-input";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { useSearchProductList } from "@/features/product/hooks/useSearchProductList";
import ThemeToggleButton from "@/features/theme/components/theme-toggle";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const LandingLayouts: React.FC = () => {
  const { users } = useAuthStore();
  const { search, setSearch } = useSearchProductList();

  return (
    <div className="text-support-100">
      <div className="sticky top-0 bg-primary-100 border-b-2 border-primary-200 p-4 flex justify-center items-center duration-300 transition-all">
        <div className="flex justify-between items-center md:w-3/4 w-full gap-4">
          <div>
            <h1 className="font-semibold text-xl">Online.Store</h1>
          </div>
          <div className="w-full md:block hidden">
            <InputSearchDebounce
              defaultValue={search}
              onChange={(val) => setSearch(val)}
              className="w-full border-support-100/30 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4 items-center">
            <ThemeToggleButton />
            {users.token ? (
              <></>
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
