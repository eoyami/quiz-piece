"use client";

import { signOut } from "next-auth/react";

const GamePage = () => {
  return (
    <section className="flex flex-col w-screen justify-center items-center bg-neutral-950 max-sm:py-6">
      <div className="flex flex-col justify-center items-center text-2xl mb-5">
        GAME
        <button
          className="bg-white text-black"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    </section>
  );
};

export default GamePage;
