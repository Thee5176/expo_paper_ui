import type { ReactNode } from "react";
import useProvideCoa from ".";
import { CoaContext } from "./context";

export default function ProvideCoa({ children }: { children: ReactNode }) {
  const coa = useProvideCoa();

  return <CoaContext.Provider value={coa}>{children}</CoaContext.Provider>;
}
