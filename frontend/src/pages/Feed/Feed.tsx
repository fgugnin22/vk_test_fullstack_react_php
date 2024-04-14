import { Header, Post } from "@/shared";
import { Api } from "@/store/api";

const Feed = () => {
  const authenticatedUser = Api.useGetUserQuery(undefined, {
    skip: !localStorage.getItem("token")
  });

  const posts = Api.useGetPostsQuery(
    {
      authorName: undefined,
      userId: authenticatedUser.data?.id
    },
    { skip: authenticatedUser.isLoading, pollingInterval: 1000 * 10 }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col gap-6 py-4 xl:py-12 grow mx-auto max-w-xl">
        <h2 className="text-2xl sm:text-4xl font-semibold">Новости</h2>
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

export default Feed;
