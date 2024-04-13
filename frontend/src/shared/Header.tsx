import { useAppDispatch } from "@/store";
import { Api } from "@/store/api";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();

  const user = Api.useGetUserQuery(undefined, {
    skip: !localStorage.getItem("token")
  });

  const handleLogoutButtonClick = () => {
    localStorage.removeItem("token");

    dispatch(Api.util.resetApiState());
  };

  return (
    <header className="h-[120px] sm:h-[80px] bg-gray-950 flex justify-between items-center px-3 xl:px-10 text-white font-medium">
      <p className="text-xl xl:text-3xl">ВоВзаимосвязи</p>
      <div className="mr-auto ml-2 md:ml-8 flex gap-4">
        <Link to={"/"} className="text-xl hover:underline">
          Главная
        </Link>
        <Link
          to={`/user/${user.data?.name}`}
          className="text-xl hover:underline"
        >
          Моя страница
        </Link>
      </div>
      {user.data ? (
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 xl:gap-6 text-center">
          <p>Здравствуйте, {user.data.name}!</p>
          <button
            onClick={handleLogoutButtonClick}
            className="bg-white py-2 px-4 rounded-lg text-black hover:bg-gray-300 transition duration-100"
          >
            Выйти
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 xl:gap-6">
          <Link
            to={"/login"}
            className="bg-white py-2 px-4 rounded-lg text-black hover:bg-gray-300 transition duration-100 w-full text-center"
          >
            Войти
          </Link>
          <Link
            to={"/register"}
            className="bg-white py-2 px-4 rounded-lg text-black hover:bg-gray-300 transition duration-100 w-full text-center"
          >
            Зарегистрироваться
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
