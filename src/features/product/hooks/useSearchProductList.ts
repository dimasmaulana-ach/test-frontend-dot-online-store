import { create } from "zustand";

export interface SearchProductListTypes {
  search: string;
  setSearch: (search: string) => void;
}

export const useSearchProductList = create<SearchProductListTypes>((set) => ({
  search: "",
  setSearch: (search: string) => set(() => ({ search })),
}));
