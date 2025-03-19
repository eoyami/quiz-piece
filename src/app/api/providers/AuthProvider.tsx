"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type ProviderType = {
  children: ReactNode;
  session: Session | null;
};

const AuthProvider = ({ session, children }: ProviderType) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
