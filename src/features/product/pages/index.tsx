import React from "react";
import { useProductList } from "../hooks/useProductList";
import { formatMoney } from "@/utils/format-money";
import InputSearchDebounce from "@/components/input/search-debounce";
import { useSearchProductList } from "../hooks/useSearchProductList";
import { useNavigate } from "react-router-dom";

const ProductListPages: React.FC = () => {
  const { products } = useProductList();
  const { search, setSearch } = useSearchProductList();
  const navigate = useNavigate();
  return (
    <div className="p-4 md:w-3/4 mx-auto flex flex-col gap-4">
      <div className="flex sm:flex-row flex-col justify-between items-center">
        <h1 className="text-2xl font-bold">Product List</h1>
        <div className="w-full md:w-1/3 sm:w-1/2">
          <InputSearchDebounce
            defaultValue={search}
            onChange={(val) => setSearch(val)}
            className="w-full border-support-100/30 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products?.length === 0 && (
          <div className="col-span-3 text-center">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
        {products?.map((product) => (
          <div
            key={product.id}
            className="border border-support-100/30 rounded-md shadow"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-md"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="mt-2 font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <p className="mt-2 text-lg font-bold">
                {formatMoney(parseInt(product.price))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPages;
