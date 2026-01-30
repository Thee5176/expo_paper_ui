import { createContext } from "react";
import type useProvideCoa from ".";

export const CoaContext = createContext<ReturnType<
  typeof useProvideCoa
> | null>(null);
