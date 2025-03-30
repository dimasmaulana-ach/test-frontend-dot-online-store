import React from "react";
import { useCartListList } from "../hooks/useCartList";
import { formatMoney } from "@/utils/format-money";
import Icon from "@mdi/react";
import { mdiDeleteOutline, mdiMinus, mdiPlus } from "@mdi/js";

const CartListPages: React.FC = () => {
  const { data, updatedebounce, deleteItemCartMutation } = useCartListList();

  return (
    <div className="p-4 md:w-3/4 mx-auto flex flex-col gap-4">
      <div className="flex sm:flex-row flex-col justify-between items-center">
        <h1 className="text-2xl font-bold">Cart List</h1>
      </div>
      <div className="grid grid-cols-1  gap-4">
        {data?.cart_items?.map((data) => (
          <div
            key={data.id}
            className="flex flex-row border border-support-100/30 rounded-md justify-between"
          >
            <div className="flex flex-row gap-2">
              <img
                src={data.product.image_url}
                alt={data.product.name}
                className="w-40 h-40 object-cover rounded-l-md"
                loading="lazy"
              />
              <div className="px-3">
                <h2 className="mt-2 md:text-xl text-base font-semibold">
                  {data.product.name}
                </h2>

                <p className="mt-2 text-sm">
                  {formatMoney(parseInt(data.product.price))}
                </p>

                <p className="mt-2 text-sm flex">
                  <button
                    className="disabled:opacity-50"
                    disabled={data.quantity === 1}
                    onClick={() => {
                      if (data.quantity > 1) {
                        updatedebounce(data.id, data.quantity - 1);
                      }
                    }}
                  >
                    <Icon path={mdiMinus} size={1} />
                  </button>
                  <input
                    type="text"
                    value={data.quantity}
                    disabled
                    readOnly
                    className="w-8 border rounded-md text-center"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > 0) {
                        updatedebounce(data.id, value);
                      }
                    }}
                  />
                  <button
                    onClick={() => updatedebounce(data.id, data.quantity + 1)}
                    className="disabled:opacity-50"
                    disabled={data.quantity === data.product.stock}
                  >
                    <Icon path={mdiPlus} size={1} />
                  </button>
                </p>

                <p className="btn-primary mt-2 font-semibold">
                  {formatMoney(parseInt(data.product.price) * data.quantity)}
                </p>
              </div>
            </div>
            <div className="flex flex-col  p-4">
              <button
                className="btn-primary bg-red-500 text-support-100 flex flex-row items-center gap-2 cursor-pointer justify-center"
                onClick={() => deleteItemCartMutation.mutateAsync(data.id)}
              >
                <Icon path={mdiDeleteOutline} size={1} />
                <span className="hidden md:block">Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartListPages;
