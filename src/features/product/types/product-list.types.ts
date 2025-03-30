export interface ProductListResponse {
  message: string;
  data: ProductListResponseData;
}

export interface ProductListResponseData {
  items: ProductListResponseDataItem[];
  pagination: ProductListResponseDataPagination;
}

export interface ProductListResponseDataItem {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductListResponseDataPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: null;
  limit: number;
}

/**
 * Product Details Response
 * @description Response for product details
 */

export interface ProductDetailsResponse {
  message: string;
  data: ProductListResponseDataItem;
}
