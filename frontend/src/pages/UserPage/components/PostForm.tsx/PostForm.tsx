import { Api } from "@/store/api";
import React from "react";

const PostForm = () => {
  const [createPost] = Api.useCreatePostMutation();

  const authenticatedUser = Api.useGetUserQuery(undefined);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const content = formData.get("content")?.toString() ?? "";

    createPost({ author_name: authenticatedUser.data?.name ?? "", content });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-2 max-w-[600px] "
    >
      <label className="text-xl" htmlFor="content">
        Что у вас нового?
      </label>
      <textarea
        className="w-full outline-none border-2 h-[120px] border-gray-400 focus:border-gray-700 rounded-lg transition p-2"
        id="content"
        name="content"
        required
      ></textarea>
      <button className="w-full py-3 bg-gray-900 rounded-lg text-white hover:bg-green-700 transition">
        Сохранить
      </button>
    </form>
  );
};

export default PostForm;
