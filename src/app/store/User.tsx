import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const User = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
  }),

  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: `register`,
          method: "POST",
          body: data,
          headers: { "content-type": "application/json" },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: `login`,
          method: "POST",
          body: data,
          headers: { "content-type": "application/json" },
        };
      },
    }),
    userLoad: builder.query({
      query: () => {
        return {
          url: `users/me`,
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include",
        };
      },
    }),

    userLogout: builder.mutation({
      query: () => {
        return {
          url: `logout`,
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useUserLoadQuery,
  useUserLogoutMutation,
} = User;
