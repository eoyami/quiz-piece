"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Yamato from '../../../public/assets/question_yamato.png'
import type { Session } from "next-auth";

const GamePage = () => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    setUserSession(session);
  }, [userSession]);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <section className="flex flex-col w-screen h-screen justify-center items-center bg-neutral-950 max-sm:py-6 max-sm:px-3">
      <div className="flex flex-col justify-center items-center text-2xl">
        {userSession && (
          <>
          <div>Timer: 00:10</div>
          <div className="flex">
            
            <div className="flex flex-col bg-white text-gray-900 p-3">
            <div className="flex justify-center items-center"><h4>Qual o nome desta personagem?</h4></div>
            <Image className="border-2 border-gray-900" src={Yamato} alt=""></Image>
            <div className="mt-3"><input type="text" placeholder="Put here your answer" className="w-full outline-hidden border-gray-900 border-2" /></div>
          </div>
          </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GamePage;
