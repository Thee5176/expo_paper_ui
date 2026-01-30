import { useCallback, useMemo, useState } from "react";
import type { CodeOfAccount } from "../../types/ledger";

// Stub implementation with placeholder data
// TODO: Replace with actual API fetch when backend is ready
const MOCK_COA_DATA: CodeOfAccount[] = [
  { code: 1000, title: "Cash", type: "Debit", balance: 0 },
  { code: 1100, title: "Accounts Receivable", type: "Debit", balance: 0 },
  { code: 1200, title: "Inventory", type: "Debit", balance: 0 },
  { code: 2000, title: "Accounts Payable", type: "Credit", balance: 0 },
  { code: 2100, title: "Notes Payable", type: "Credit", balance: 0 },
  { code: 3000, title: "Owner's Equity", type: "Credit", balance: 0 },
  { code: 4000, title: "Sales Revenue", type: "Credit", balance: 0 },
  { code: 5000, title: "Cost of Goods Sold", type: "Debit", balance: 0 },
  { code: 6000, title: "Operating Expenses", type: "Debit", balance: 0 },
];

export default function useProvideCoa() {
  const [coaCached, setCoaCached] = useState<CodeOfAccount[]>(MOCK_COA_DATA);

  const fetchCoa = useCallback(async () => {
    // TODO: Implement actual API fetch
    // const response = await axiosQueryClient.post("/available-coa/json");
    // setCoaCached(response.data);

    // For now, just use mock data
    setCoaCached(MOCK_COA_DATA);
  }, []);

  const getAccountName: Record<number, string> = useMemo(() => {
    const map: Record<number, string> = {};
    coaCached.forEach((account) => {
      map[account.code] = account.title;
    });
    return map;
  }, [coaCached]);

  const getBalanceType: Record<number, string> = useMemo(() => {
    const map: Record<number, string> = {};
    coaCached.forEach((account) => {
      map[account.code] = account.type;
    });
    return map;
  }, [coaCached]);

  return {
    codeOfAccounts: coaCached,
    getAccountName,
    getBalanceType,
    fetchCoa,
    removeCoaCached: () => setCoaCached([]),
  };
}
