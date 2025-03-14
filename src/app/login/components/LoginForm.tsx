import React from "react";

const LoginForm = () => {
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
          />
        </div>
        <div className="flex flex-col text-xl">
          <label htmlFor="password">Senha</label>
          <input
            type="text"
            placeholder="******"
            name="password"
            className="bg-white text-black"
          />
        </div>
        <div className="my-5">
          <button className="text-xl w-full bg-white border-2 text-gray-950 hover:bg-gray-950 hover:text-white hover:border-2 hover:border-white">
            SIGN IN
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
