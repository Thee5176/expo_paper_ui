export interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  ledgerItems: LedgerItem[];
  timestamp: string;
}

export interface LedgerItem {
  coa: number;
  amount: number;
  balanceType: string;
}

export interface BalanceCheck {
  debitTotal: number;
  creditTotal: number;
  diff: number;
  isBalanced: boolean;
}

export interface CodeOfAccount {
  code: number;
  title: string;
  type: string;
  balance: number;
}
