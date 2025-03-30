import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CartListResponse,
  CartListResponseData,
} from "../types/cart-list.types";
import auth from "@/config/api/auth";
import debounceImmediate from "@/utils/debounce";

export const fetchCartList = async (): Promise<CartListResponseData> => {
  const { data } = await auth.get<CartListResponse>(`/cart-items`);
  return data.data;
};

export const updateItemCart = async (
  id: string,
  quantity: number
): Promise<CartListResponseData> => {
  const { data } = await auth.patch<CartListResponse>(`/cart-items/${id}`, {
    quantity,
  });

  return data.data;
};

export const useCartListoductList = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cartList"],
    queryFn: fetchCartList,
    refetchOnWindowFocus: false,
  });

  const updateItemCartMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateItemCart(id, quantity),
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      console.log("error");
    },
  });

  const updatedebounce = debounceImmediate((id: string, quantity: number) => {
    updateItemCartMutation.mutate({ id, quantity });
  }, 500);

  return {
    data,
    isLoading,
    refetch,
    updateItemCartMutation,
    updatedebounce,
  };
};
