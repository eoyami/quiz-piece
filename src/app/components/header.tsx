"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import QuizPieceLogo from "../../../public/assets/quizpiece_logo.png";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const patchname = usePathname();
  useEffect(() => {
    const btnMobile = document.getElementById("btn-mobile");
    btnMobile?.addEventListener("click", () => {
      setIsOpen(!isOpen);
    });
  }, [isOpen]);

  const {status} = useSession()
  const [isAuth, setIsAuth] = useState<"authenticated" | "unauthenticated" | "loading">("loading")

  useEffect(() => {
    setIsOpen(false);
  }, [patchname]);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(()=> {setIsAuth(status)}, [status])
  return (
    <div>
      <header className="flex px-4 py-2 bg-gray-950">
        <nav className="flex justify-between w-full">
          <div>
            <Link href={"/"}>
              <Image
                src={QuizPieceLogo}
                alt="Logo Quiz Piece"
                height={40}
                loading="lazy"
              />
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <div id="btn-mobile" className="hidden max-sm:flex text-3xl">
              {isOpen ? <IoClose /> : <IoMenu />}
            </div>
            {isAuth === 'authenticated' ? (<div className="max-sm:hidden hover:bg-white p-2 hover:text-black">
              <Link href="/game">Game</Link>
            </div>) : null}
            {isAuth === 'authenticated' ? (null) : (
              <div className="max-sm:hidden hover:bg-white p-2 hover:text-black">
              <Link href="/login">Faça login</Link>
          </div>)
          }
            {isAuth === 'authenticated' ? (
              <div className="max-sm:hidden hover:bg-white p-2 hover:text-black cursor-pointer" onClick={() => {
                handleSignOut();
              }}>
              Sign Out
          </div>) : <div className="max-sm:hidden hover:bg-white p-2 hover:text-black">
            <Link href="/register">Registre-se</Link>
          </div>}
          </div>
        </nav>
      </header>
      {isOpen ? (
        <div
          id="menu-mobile"
          className="md:hidden max-sm:fixed max-sm:flex max-sm:flex-col max-sm:items-center max-sm:h-screen max-sm:w-full max-sm:bg-gray-950 max-sm:z-11"
        >
          {isAuth === 'authenticated' ? (<div className="max-sm:hidden hover:bg-white p-2 hover:text-black">
              <Link href="/game">Game</Link>
            </div>) : null}

            {isAuth === 'authenticated' ? null : <div className="hover:bg-white p-2 hover:text-black">
            <Link href="/login">Faça login</Link>
          </div>}
          
          
          {isAuth === 'authenticated' ? (
            <div className="hover:bg-white p-2 hover:text-black text-2xl" onClick={() => {
              handleSignOut();
            }}>
            <div>Sign Out</div>
          </div>) : <div className="hover:bg-white p-2 hover:text-black ">
            <Link href="/register">Registre-se</Link>
          </div>}
        </div>
      ) : null}
    </div>
  );
};

export default Header;
