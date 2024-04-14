import { Api, Post as PostType } from "@/store/api";
import { Link } from "react-router-dom";

type PostComponentProps = {
  post: PostType;
  isLoggedIn: boolean;
};

const Post: React.FC<PostComponentProps> = ({ post, isLoggedIn }) => {
  const [likePost] = Api.useToggleLikeMutation();

  const postDate = new Date(post.created_at);

  // это выглядит лениво, но как есть)
  postDate.setHours(postDate.getHours() + 3);

  const handleToggleLikeClick = () => {
    likePost({ post_id: post.id });
  };
  return (
    <div className="flex flex-col gap-3 last-of-type:border-none py-3 border-b border-gray-400">
      <p className="text-xl flex items-center">
        <Link to={`/user/${post.author_name}`} className="mr-2 hover:underline">
          {post.author_name}
        </Link>{" "}
        {postDate.toLocaleString()}
        <button
          className={`ml-auto transition ${
            post.is_liked
              ? "enabled:fill-red-500 hover:enabled:fill-black"
              : "hover:enabled:fill-red-500 enabled:fill-black"
          }`}
          onClick={handleToggleLikeClick}
          disabled={!isLoggedIn}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 1025.00 1025.00"
            version="1.1"
          >
            <g id="SVGRepo_iconCarrier">
              <path d="M512.8 977.4c-26.1 0-50.1-7.3-71.5-21.7C323.5 897 0 675.3 0 400.5 0 212 153.4 58.6 341.9 58.6c60.5 0 119 15.8 170.9 45.9 51.9-30.1 110.5-45.9 170.9-45.9 188.5 0 341.9 153.4 341.9 341.9 0 274.8-323.5 496.6-441.3 555.2-21.4 14.4-45.4 21.7-71.5 21.7zM341.9 144.1c-141.4 0-256.4 115-256.4 256.4 0 117.2 80.6 225.2 148.2 295.1 86.1 89 187.5 155.2 248.1 184.8l6.1 3.7c15.1 10.8 34.6 10.8 49.7 0l6.1-3.7C604.4 850.7 705.8 784.6 791.8 695.6c67.6-69.9 148.2-177.8 148.2-295.1 0-141.4-115-256.4-256.4-256.4-52.6 0-103.2 16-146.5 46.1L512.8 207.3l-24.5-17.1c-43.2-30.2-93.9-46.1-146.4-46.1z"></path>
            </g>
          </svg>
        </button>
        <span className="ml-1">{post.likes_amount}</span>
      </p>
      <p className="text-lg max-w-full break-all">{post.content}</p>
    </div>
  );
};

export default Post;
