import auth from "@/config/api/auth";
import { useQuery } from "@tanstack/react-query";

export const fetchCountCart = async () => {
  const { data } = await auth.put(`/cart-items`);
  return data.data;
};

export const useCartCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cartCount"],
    queryFn: () => fetchCountCart(),
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
  };
};
