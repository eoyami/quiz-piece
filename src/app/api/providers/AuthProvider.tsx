"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type ProviderChildren = {
  children: ReactNode;
};

const AuthProvider = ({ children }: ProviderChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
