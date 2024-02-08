import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { camelCaseKeys, snakeCaseKeys } from "~/utils/string";

const csrfToken = (
  document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
).content;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: async (headers) => {
      headers.set("X-CSRF-Token", csrfToken);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        body: snakeCaseKeys({ user: body }),
        method: "POST",
      }),
      transformResponse: camelCaseKeys,
    }),
    createSession: builder.mutation({
      query: (body) => ({
        url: "/session",
        body: snakeCaseKeys({ user: body }),
        method: "POST",
      }),
      transformResponse: camelCaseKeys,
    }),
    destroySession: builder.mutation({
      query: () => ({
        url: "/session",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useCreateSessionMutation,
  useDestroySessionMutation,
} = api;
