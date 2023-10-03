import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Order = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
  }),

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "order",
          method: "POST",
          body: data,
          credentials: "include",
          headers: { "content-type": "application/json" }
        };
      },
    }),

    getOrder: builder.query({
      query: () => {
        return {
          url: "order/myorder",
          method: "GET",
          credentials: "include",
          headers: { "content-type": "application/json" }
        };
      },
    }),

    getSingleOrder: builder.query({
      query: (id) => {
        return {
          url: `order/myorder/${id}`,
          method: "GET",
          credentials: "include",
          headers: { "content-type": "application/json" }
        };
      },
    }),

  }),
});

export const { useCreateOrderMutation, useGetOrderQuery, useGetSingleOrderQuery } = Order;
