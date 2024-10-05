"use client";
import { Session } from "next-auth";
import { FC, ReactNode } from "react";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

interface ISessionProvidersProps {
  children: ReactNode;
  session: Session | null;
}

const SessionProvider: FC<ISessionProvidersProps> = ({ children, session }) => {
  return (
    <>
      <NextAuthProvider session={session}>{children}</NextAuthProvider>
    </>
  );
};

export default SessionProvider;
