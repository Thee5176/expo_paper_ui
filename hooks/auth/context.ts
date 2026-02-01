import { createContext } from "react";
import type useProvideAuth from ".";

export const AuthContext = createContext<ReturnType<
  typeof useProvideAuth
> | null>(null);
