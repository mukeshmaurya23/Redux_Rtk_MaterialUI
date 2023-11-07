import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ENDPOINT,
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodoList: builder.query({
      query: () => ({
        url: "/Todos",
        method: "GET",
      }),
      providesTags: ["Todo"],
    }),
  }),
});

export const { useGetTodoListQuery } = todoApi;
