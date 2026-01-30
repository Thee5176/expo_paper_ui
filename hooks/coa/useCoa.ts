import { useContext } from "react";
import { CoaContext } from "./context";

export const useCoa = () => {
  const ctx = useContext(CoaContext);
  if (!ctx) throw new Error("useCoa must be used within CoaProvider");

  return ctx;
};
