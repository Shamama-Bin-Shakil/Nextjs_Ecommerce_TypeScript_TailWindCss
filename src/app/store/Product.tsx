import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Product = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),

  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (value) => {
        if (value.product === true) {
          return {
            url: `products?limit=8`,
            method: "GET",
          };
        } else if (value.search !== null) {
          return {
            url: `products/category/${value.search}`,
            method: "GET",
          };
        } else {
          return {
            url: `products?limit=24&skip=${value.skip | 0} `,
            method: "GET",
          };
        }
      },
    }),

    getProductWithSearch: builder.query({
      query: (searchInput) => {
        return {
          url: `products/search?q=${searchInput}`,
          method: "GET",
        };
      },
    }),

    getSingleProduct: builder.query({
      query: (productId) => {
        return {
          url: `products/${productId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductWithSearchQuery,
  useGetSingleProductQuery,
} = Product;
