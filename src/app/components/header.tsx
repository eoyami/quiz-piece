"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import QuizPieceLogo from "../../../public/assets/quizpiece_logo.png";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const patchname = usePathname();
  useEffect(() => {
    const btnMobile = document.getElementById("btn-mobile");
    btnMobile?.addEventListener("click", () => {
      setIsOpen(!isOpen);
    });
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [patchname]);
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
            <div className="max-sm:hidden hover:bg-white p-2 hover:text-black">
              <Link href="/login">Faça login</Link>
            </div>
            <div className="max-sm:hidden hover:bg-white p-2 hover:text-black">
              <Link href="/register">Registre-se</Link>
            </div>
          </div>
        </nav>
      </header>
      {isOpen ? (
        <div
          id="menu-mobile"
          className="md:hidden max-sm:fixed max-sm:flex max-sm:flex-col max-sm:items-center max-sm:h-screen max-sm:w-full max-sm:bg-gray-950 max-sm:z-11"
        >
          <div className="hover:bg-white p-2 hover:text-black text-2xl">
            <Link href="/login">Faça login</Link>
          </div>
          <div className=" hover:bg-white p-2 hover:text-black text-2xl">
            <Link href="/register">Registre-se</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
