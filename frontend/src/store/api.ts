import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
  id: number;
  name: string;
};

export type Post = {
  id: number;
  content: string;
  author_name: string;
  likes_amount: number;
  created_at: string;
  is_liked: string;
};

export type UserCredentials = {
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

  tagTypes: ["Post", "User"],

  refetchOnMountOrArgChange: false,
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
      },
      invalidatesTags: ["User"]
    }),
    getUser: builder.query<User, undefined>({
      query: () => {
        return {
          url: `user/login`,
          method: "GET"
        };
      },
      providesTags: ["User"]
    }),
    getUserById: builder.query<User, number>({
      query: (userId) => {
        return {
          url: `user?id=${userId}`,
          method: "GET"
        };
      },
      providesTags: ["User"]
    }),
    getUserByName: builder.query<User, string>({
      query: (userName) => {
        return {
          url: `user?name=${userName}`,
          method: "GET"
        };
      },
      providesTags: ["User"]
    }),
    registerUser: builder.mutation<User, UserCredentials>({
      query: (credentials) => {
        return {
          url: `user/register`,
          method: "POST",
          body: JSON.stringify(credentials)
        };
      },
      invalidatesTags: ["User"]
    }),
    getPosts: builder.query<
      Post[],
      { userId: number | undefined; authorName: string | undefined }
    >({
      query: ({ authorName, userId }) => {
        if (authorName !== undefined) {
          return {
            url: `posts?author_name=${authorName}&current_user_id=${
              userId ?? -1
            }`,
            method: "GET"
          };
        }

        return { url: `posts?current_user_id=${userId ?? -1}`, method: "GET" };
      },
      providesTags: ["Post"]
    }),
    createPost: builder.mutation<
      Post,
      Omit<Post, "id" | "likes_amount" | "created_at" | "is_liked">
    >({
      query: (post) => {
        return {
          url: `posts`,
          method: "POST",
          body: JSON.stringify(post)
        };
      },
      invalidatesTags: ["Post"]
    }),
    toggleLike: builder.mutation<string, { post_id: number }>({
      query: (body) => {
        return {
          url: `posts/like`,
          method: "POST",
          body: JSON.stringify(body)
        };
      },
      invalidatesTags: ["Post"]
    })
  })
});

export { Api };
