"use client";
import React, { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import scss from "./LayoutSite.module.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

const LayoutSite: FC<LayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      <div className={scss.LayoutSite}>
        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </SessionProvider>
  );
};

export default LayoutSite;
