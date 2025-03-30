import { useMutation, useQueryClient } from "@tanstack/react-query";
import auth from "@/config/api/auth";

export const cartAddMutation = async (product: string) => {
  const { data } = await auth.post(`/cart-items`, {
    product: product,
    quantity: 1,
  });
  return data.data;
};

export const useAddCart = () => {
  const queryClient = useQueryClient();

  const cartAdd = useMutation({
    mutationFn: (product: string) => cartAddMutation(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return {
    cartAdd,
  };
};
