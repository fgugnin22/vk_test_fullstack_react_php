import React, { useState } from "react";
import { Api, UserCredentials } from "@/store/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [login] = Api.useLoginMutation();
  const [getUserData] = Api.useLazyGetUserQuery();

  const navigate = useNavigate();

  const [formState, setFormState] = useState<Partial<UserCredentials>>({
    name: "",
    password: ""
  });

  const [error, setError] = useState(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setError(false);

    const target = e.target as HTMLInputElement;

    setFormState((p) => ({ ...p, [target.name]: target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(formState as Required<UserCredentials>)
      .unwrap()
      .then(({ auth_token }) => {
        localStorage.setItem("token", auth_token);

        return getUserData(undefined).unwrap();
      })
      .then((userData) => {
        navigate(`/user/${userData.name}`);
      })
      .catch(() => setError(true));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto max-w-sm flex flex-col gap-6 mt-24"
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold">Войти</h1>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name">Псевдоним</label>
        <input
          onChange={handleInputChange}
          className="p-2 border rounded-lg border-gray-400 focus:border-gray-700 transition"
          name="name"
          id="name"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Пароль</label>
        <input
          onChange={handleInputChange}
          className="p-2 border rounded-lg border-gray-400 focus:border-gray-700 transition"
          name="password"
          id="password"
          type="password"
          required
        />
      </div>
      <Link
        className="-my-5 text-right hover:underline text-blue-700"
        to={"/register"}
      >
        Нет аккаунта?
      </Link>{" "}
      <button className="w-full py-3 bg-gray-900 rounded-lg text-white hover:bg-green-700 transition">
        Войти
      </button>
      {error && (
        <p className="text-sm font-semibold text-red-700 text-center">
          Произошла ошибка!
        </p>
      )}
    </form>
  );
}
