import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
  id: number;
  name: string;
};

export type Post = {
  id: number;
  content: string;
  author_id: number;
  likes_amount: number;
};

type UserCredentials = {
  name: string;
  password: string;
};

const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_ROOT_URL }),
  tagTypes: ["Post"],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    login: builder.mutation<string, UserCredentials>({
      query: (credentials) => {
        return {
          url: `user/login`,
          method: "POST",
          body: JSON.stringify(credentials)
        };
      }
    })
  })
});

export { Api };
