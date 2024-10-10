"use client";
import { links } from "@/constants/links";
import scss from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { LuUserPlus } from "react-icons/lu";
import { LuUserCheck } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useHeaderStore } from "@/stores/useHeaderSrote";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const {setIsMobile, isMobile} = useHeaderStore()

  const changeIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    changeIsMobile();
    window.addEventListener("resize", changeIsMobile);
    return () => {
      window.removeEventListener("resize", changeIsMobile);
    };
  }, []);

  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            <div className={scss.logo}>
              <Link href="/">
                <h1>EcoMovie</h1>
              </Link>
            </div>
          </div>
          <div className={scss.right}>
            {!isMobile ? (
              <nav className={scss.nav}>
                <ul>
                  {links.map((item, index) => (
                    <li key={index}>
                      <Link
                        className={
                          pathname === item.href
                            ? `${scss.link} ${scss.active}`
                            : `${scss.link}`
                        }
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  {session ? (
                    <button
                      className={scss.authButtonLogOut}
                      onClick={() => signOut()}
                    >
                      <LuUserCheck />
                    </button>
                  ) : (
                    <button
                      className={scss.authButtonLogIn}
                      onClick={() => signIn("github")}
                    >
                      <LuUserPlus />
                    </button>
                  )}
                </ul>
              </nav>
            ) : (
              <span>|||</span>
            )}
          </div>
          {/* <div className={scss.modal}>
            {
              links.
            }
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
