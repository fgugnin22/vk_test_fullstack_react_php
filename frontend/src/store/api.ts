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
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ROOT_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `${token}`);
      }

      headers.set("Accept", "*/*");
      headers.set("Content-Type", "application/json");

      return headers;
    }
  }),

  tagTypes: ["Post"],

  refetchOnMountOrArgChange: true,
  refetchOnFocus: false,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    login: builder.mutation<{ auth_token: string }, UserCredentials>({
      query: (credentials) => {
        return {
          url: `user/login`,
          method: "POST",
          body: JSON.stringify(credentials)
        };
      }
    }),
    getUser: builder.mutation<User, undefined>({
      query: () => {
        return {
          url: `user/login`,
          method: "GET"
        };
      }
    }),
    registerUser: builder.mutation<User, UserCredentials>({
      query: (credentials) => {
        return {
          url: `user/register`,
          method: "POST",
          body: JSON.stringify(credentials)
        };
      }
    }),
    getPosts: builder.query<Post[], string | undefined>({
      query: (authorId) => {
        if (authorId !== undefined) {
          return { url: `posts?author_id=${authorId}`, method: "GET" };
        }

        return { url: `posts?`, method: "GET" };
      }
    }),
    createPost: builder.mutation<Post, Omit<Post, "id" | "likes_amount">>({
      query: (post) => {
        return {
          url: `posts/`,
          method: "POST",
          body: JSON.stringify(post)
        };
      }
    }),
    toggleLike: builder.mutation<string, { post_id: number }>({
      query: (body) => {
        return {
          url: `user/register`,
          method: "POST",
          body: JSON.stringify(body)
        };
      }
    })
  })
});

export { Api };
