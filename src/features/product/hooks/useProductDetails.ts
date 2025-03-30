import unauth from "@/config/api/unauth";
import {
  ProductDetailsResponse,
  ProductListResponseDataItem,
} from "../types/product-list.types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const fetchProductList = async (
  id: string
): Promise<ProductListResponseDataItem> => {
  const { data } = await unauth.get<ProductDetailsResponse>(`/products/${id}`);
  return data.data;
};

export const useProductDetails = () => {
  const { id } = useParams();
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product-details"],
    queryFn: () => fetchProductList(id as string),
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
