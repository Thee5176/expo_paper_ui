import type { ReactNode } from "react";
import useProvideAuth from ".";
import { AuthContext } from "./context";

export default function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
