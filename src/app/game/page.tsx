"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Session } from "next-auth";

const GamePage = () => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const { data } = useSession();
  useEffect(() => {
    setUserSession(data);
  }, [userSession]);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <section className="flex flex-col w-screen justify-center items-center bg-neutral-950 max-sm:py-6">
      <div className="flex flex-col justify-center items-center text-2xl mb-5">
        GAME
        {userSession && (
          <button
            className="bg-white text-black"
            onClick={() => {
              handleSignOut();
            }}
          >
            Sign Out
          </button>
        )}
      </div>
    </section>
  );
};

export default GamePage;
