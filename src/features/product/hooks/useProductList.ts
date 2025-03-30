import unauth from "@/config/api/unauth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import {
  ProductListResponse,
  ProductListResponseData,
  ProductListResponseDataItem,
  ProductListResponseDataPagination,
} from "../types/product-list.types";
import { useSearchProductList } from "./useSearchProductList";

export const fetchProductList = async (
  page: number,
  limit: number,
  search: string,
  sort: string
): Promise<ProductListResponseData> => {
  const { data } = await unauth.get<ProductListResponse>(
    `/products?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
  );
  return data.data;
};

export const useProductList = () => {
  const { search } = useSearchProductList();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    sort: "",
  });
  const [_, setDataPagination] =
    useState<ProductListResponseDataPagination>({
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: 0,
      prevPage: null,
      limit: 0,
    });
  const [products, setProducts] = useState<ProductListResponseDataItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const {
    data: productList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "product",
      pagination.page,
      pagination.limit,
      search,
      pagination.sort,
    ],
    queryFn: () =>
      fetchProductList(
        pagination.page,
        pagination.limit,
        search,
        pagination.sort
      ),
    enabled: pagination.page === 1,
  });

  useEffect(() => {
    setProducts([]);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [search]);

  useEffect(() => {
    if (productList) {
      setDataPagination(productList?.pagination);

      setProducts((prev) => {
        const newData = productList?.items.filter(
          (item: { id: string }) =>
            !prev.some((existing) => existing?.id === item?.id)
        );
        return [...prev, ...newData];
      });
    }
  }, [productList]);

  const loadMore = useCallback(async () => {
    // alert(dataPagination.totalPages)
    // if (dataPagination && pagination.page < dataPagination.totalPages) {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const newPage = pagination.page + 1;
      const newProducts = await fetchProductList(
        newPage,
        pagination.limit,
        search,
        pagination.sort
      );

      setProducts((prev) => {
        const uniqueProducts = newProducts?.items?.filter(
          (item: { id: string }) =>
            !prev.some((existing) => existing?.id === item?.id)
        );
        return [...prev, ...uniqueProducts];
      });
      setDataPagination(newProducts?.pagination);
      setPagination((prev) => ({ ...prev, page: newPage }));
    } finally {
      setIsFetching(false);
    }
    // }
  }, [pagination, isFetching, search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return {
    products,
    isLoading,
    isFetching,
    refetch,
    pagination,
    setPagination,
    loadMore,
    setProducts,
  };
};
