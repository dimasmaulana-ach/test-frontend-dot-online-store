import React from "react";
import { useProductDetails } from "../hooks/useProductDetails";
import { formatMoney } from "@/utils/format-money";
import Icon from "@mdi/react";
import { mdiCartOutline, mdiChevronLeft } from "@mdi/js";
import { useAddCart } from "@/features/cart/hooks/useAddCart";
import Loaders from "@/components/loading/loaders";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";

const ProductDetailsPages: React.FC = () => {
  const { data } = useProductDetails();
  const { cartAdd } = useAddCart();
  const { users } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="transition-all duration-300">
      <div className="p-4 w-3/4 mx-auto flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <Link to={"/"}>
            <Icon path={mdiChevronLeft} size={1.3} />
          </Link>
          <h1 className="text-2xl font-bold">Product Details</h1>
        </div>

        <div className="flex gap-5 flex-col">
          <div className="flex md:flex-row flex-col gap-5">
            <img
              src={data?.image_url}
              alt={data?.name}
              className="md:w-1/2 h-80 object-cover"
            />
            <div className="flex justify-between flex-col">
              <div className="flex flex-col">
                <h2 className="text-3xl font-semibold">{data?.name}</h2>
                <p className="text-base text-gray-500 line-clamp-2">
                  Stock : {data?.stock}
                </p>
                <p className="mt-4 text-xl font-bold">
                  {formatMoney(parseInt(data?.price || "0"))}
                </p>
              </div>
              <div>
                <button
                  className="btn-primary flex flex-row items-center gap-2 cursor-pointer w-36 justify-center"
                  onClick={() => {
                    if (!users.token) {
                      navigate("/login");
                    }
                    cartAdd.mutateAsync(data?.id || "");
                  }}
                >
                  {cartAdd.isPending ? (
                    <Loaders size={1} />
                  ) : (
                    <>
                      <Icon path={mdiCartOutline} size={1} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>{data?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPages;
