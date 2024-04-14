import { Header, Post } from "@/shared";
import { Api } from "@/store/api";
import { useParams } from "react-router-dom";
import PostForm from "./components/PostForm.tsx";

const UserPage = () => {
  const pageUserName = useParams().name ?? "";

  const authenticatedUser = Api.useGetUserQuery(undefined, {
    skip: !localStorage.getItem("token")
  });

  const pageUser = Api.useGetUserByNameQuery(pageUserName);

  const posts = Api.useGetPostsQuery(
    { authorName: pageUser.data?.name, userId: authenticatedUser.data?.id },
    {
      skip: pageUser.data?.name === undefined || authenticatedUser.isLoading,
      pollingInterval: 1000 * 10
    }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col gap-6 py-4 xl:py-12 grow mx-auto max-w-xl">
        <h2 className="text-2xl sm:text-4xl font-semibold">
          {authenticatedUser.data?.name === pageUserName
            ? `Добро пожаловать, ${authenticatedUser.data.name}`
            : `Страница автора ${pageUser.data?.name}`}
        </h2>
        {authenticatedUser.data?.name === pageUserName && <PostForm />}
        <h3 className="text-xl sm:text-3xl font-medium">
          {authenticatedUser.data?.name === pageUserName
            ? "Ваши посты"
            : `Посты автора ${pageUser.data?.name}`}
        </h3>
        <div className="flex flex-col gap-6">
          {posts.data?.map((post) => (
            <Post
              key={post.created_at}
              post={post}
              isLoggedIn={authenticatedUser.isSuccess}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserPage;
