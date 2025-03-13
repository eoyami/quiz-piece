import React from "react";

const LoginForm = () => {
  return (
    <section className="flex flex-col w-screen justify-center items-center bg-white py-6">
      <form action="" method="POST" className="flex flex-col p-6 bg-gray-950">
        <div className="flex flex-col text-xl">
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email" className="bg-white text-black" />
        </div>
        <div className="flex flex-col text-xl">
          <label htmlFor="password">Senha</label>
          <input type="text" name="password" className="bg-white text-black" />
        </div>
        <div className="my-2">
          <button className="text-xl w-full bg-white border-2 text-gray-950 hover:bg-gray-950 hover:text-white hover:border-2 hover:border-white">
            SIGN IN
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
