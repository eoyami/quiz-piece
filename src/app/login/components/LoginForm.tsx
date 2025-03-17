"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handlerLogin() {
    try {
      if (!email || !password) {
        setError("Preencha todos os campos");
      }

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        alert(res.error);
        return;
      }
    } catch (error) {
      setError(error as string);
    }
  }
  return (
    <section className="flex flex-col w-screen justify-center items-center bg-neutral-950 max-sm:py-6">
      <form
        action=""
        method="POST"
        className="flex flex-col px-12 py-8 bg-gray-950 border-2 border-white"
      >
        <div className="flex flex-col justify-center items-center text-2xl mb-5">
          Entre na sua conta
        </div>
        <div className="flex flex-col text-xl">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            placeholder="seuemail@gmail.com"
            name="email"
            className="bg-white text-black"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col text-xl">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="******"
            name="password"
            className="bg-white text-black"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="my-5">
          <button
            className="text-xl w-full bg-white border-2 text-gray-950 hover:bg-gray-950 hover:text-white hover:border-2 hover:border-white"
            onClick={handlerLogin}
          >
            SIGN IN
          </button>

          {error && <div className="bg-red-500">{error}</div>}
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
