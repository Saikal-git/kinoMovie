"use client";

import { api } from "@/redux/api";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { FC, ReactNode } from "react";

interface IReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: FC<IReduxProviderProps> = ({ children }) => {
  return <ApiProvider api={api}>{children}</ApiProvider>;
};

export default ReduxProvider;
