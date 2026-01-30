import type { ReactNode } from "react";
import { useWatch } from "react-hook-form";
import { useProvideBalance } from ".";
import type { LedgerEntry } from "../../types/ledger";
import { BalanceContext } from "./context";

export default function ProvideBalance({ children }: { children: ReactNode }) {
  const items = useWatch<LedgerEntry, "ledgerItems">({ name: "ledgerItems" });
  const balance = useProvideBalance(items);

  return (
    <BalanceContext.Provider value={balance}>
      {children}
    </BalanceContext.Provider>
  );
}
