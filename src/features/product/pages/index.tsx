import React, { useRef } from "react";
import { useProductList } from "../hooks/useProductList";
import { formatMoney } from "@/utils/format-money";
import InputSearchDebounce from "@/components/input/search-debounce";
import { useSearchProductList } from "../hooks/useSearchProductList";

const ListProductPages: React.FC = () => {
  const { products, isLoading } = useProductList();
  const { search, setSearch } = useSearchProductList();
  const loader = useRef(null);
  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Product List</h1>
        <div className="w-full block md:hidden">
          <InputSearchDebounce
            defaultValue={search}
            onChange={(val) => setSearch(val)}
            className="w-full border-support-100/30 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="border border-support-100/30 rounded-md shadow"
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
      <div ref={loader} className="h-10 mt-4 text-center">
        {isLoading && <p>Loading more products...</p>}
      </div>
    </div>
  );
};

export default ListProductPages;
