import { createContext } from "react";
import type { useProvideBalance } from ".";

export const BalanceContext = createContext<ReturnType<
  typeof useProvideBalance
> | null>(null);
