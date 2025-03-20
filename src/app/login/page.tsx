"use client"
import React from "react";
import LoginForm from "./components/LoginForm";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const page = () => {
  const { status } = useSession()
  const {data: session} = useSession()
   const [isAuth, setIsAuth] = useState<"authenticated" | "unauthenticated" | "loading">("loading")

  useEffect(()=> {
    setIsAuth(status)
  }, [status])


  if (isAuth === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <>
    { isAuth === "authenticated" ? (
        <div className="flex h-screen w-screen">
        <div><p>você já está logado como: {session?.user?.email}</p></div>
      </div>
    ) : (
    
    <div className="flex h-screen w-screen">
    <LoginForm />
  </div>)
    }
    </>
  );
};

export default page;
