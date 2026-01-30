import { useContext } from "react";
import { BalanceContext } from "./context";

export const useBalance = () => {
  const ctx = useContext(BalanceContext);
  if (!ctx) throw new Error("useBalance must be used within ProvideBalance");

  return ctx;
};
