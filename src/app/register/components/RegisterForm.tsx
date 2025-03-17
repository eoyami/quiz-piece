"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import type { RegisterType } from "../../api/register/schemas/register.schema";

const RegisterForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [alert, setAlert] = useState<string>("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();

    const registerData: RegisterType = {
      email,
      password,
      passwordConfirmation,
    };

    if (!email || !password || !passwordConfirmation) {
      setTimeout(() => {
        setError("Preencha todos os campos");
      }, 3000);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Senhas não conferem");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const responseUserExist = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email: registerData.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (responseUserExist.status === 409) {
        setError("Usuário já registrado");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email: registerData.email,
          password: registerData.password,
          passwordConfirmation: registerData.passwordConfirmation,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setAlert("Usuário criado com sucesso");
        setTimeout(() => {
          setAlert("");
        }, 3000);
      }
    } catch (error) {
      setError("Erro ao criar usuário");
      setTimeout(() => {
        setError(`${error}`);
      }, 3000);
    }
  };

  return (
    <section className="flex flex-col w-screen justify-center items-center bg-neutral-950 max-sm:py-6">
      <form
        onSubmit={handleRegister}
        action=""
        method=""
        className="flex flex-col px-12 py-8 bg-gray-950 border-2 border-white"
      >
        <div className="flex flex-col justify-center items-center text-2xl mb-5">
          Registre-se abaixo
        </div>
        <div className="bg-green-500">{alert}</div>
        <div className="flex flex-col text-xl">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            placeholder="seuemail@gmail.com"
            name="email"
            className="bg-white text-black"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col text-xl">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            min={6}
            placeholder="******"
            name="password"
            className="bg-white text-black"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col text-xl">
          <label htmlFor="password">Confirmar Senha</label>
          <input
            type="password"
            placeholder="******"
            min={6}
            name="passwordConfirmation"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirmation(e.target.value)
            }
            className="bg-white text-black"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="my-2">
          <button
            type="submit"
            className="text-xl w-full bg-white border-2 text-gray-950 hover:bg-gray-950 hover:text-white hover:border-2 hover:border-white"
          >
            REGISTER
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
