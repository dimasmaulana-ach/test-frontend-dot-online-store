export interface CartListResponse {
  message: string;
  data:    CartListResponseData;
}

export interface CartListResponseData {
  cart_items: CartListResponseDataCartItem[];
}

export interface CartListResponseDataCartItem {
  id:       string;
  quantity: number;
  cart:     CartListResponseDataCartItemCart;
  product:  CartListResponseDataCartItemProduct;
}

export interface CartListResponseDataCartItemCart {
  id: string;
}

export interface CartListResponseDataCartItemProduct {
  id:        string;
  name:      string;
  price:     string;
  stock:     number;
  image_url: string;
}
