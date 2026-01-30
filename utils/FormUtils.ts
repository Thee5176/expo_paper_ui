import { type SubmitHandler } from "react-hook-form";
import { axiosCommandClient } from "../service/api";
import type { LedgerEntry } from "../types/ledger";

// Send Data to Command Service
const sendLedgerEntry = async (data: LedgerEntry) => {
  try {
    const response = await axiosCommandClient.post("/ledger", data);
    console.log(response.status);
    return response.data;
  } catch (error) {
    console.error("Failed to send ledger entry data:", error);
    throw error;
  }
};

const updateLedgerEntry = async (data: LedgerEntry) => {
  try {
    const response = await axiosCommandClient.put("/ledger", data);
    console.log(response.status);
    return response.data;
  } catch (error) {
    console.error("Failed to update ledger entry data:", error);
    throw error;
  }
};

export const deleteLedgerEntry = async (uuid: string) => {
  try {
    const response = await axiosCommandClient.delete("/ledger", {
      params: { uuid },
    });
    console.log(response.status);
    return response.data;
  } catch (error) {
    console.error("Failed to delete ledger entry:", error);
    throw error;
  }
};

export const onSubmit: SubmitHandler<LedgerEntry> = async (
  data: LedgerEntry,
) => {
  // Add timestamp to the data
  data.timestamp = new Date().toISOString();

  // Adjust null and fix ledgeritem order
  data.ledgerItems = data.ledgerItems
    .filter((item) => item != null)
    .map((item, idx) => ({
      ...item,
      id: idx + 1,
      coa: Number(item.coa),
    }));

  if (data.id) {
    const result = await updateLedgerEntry(data);
    console.log("Update result:", result);
  } else {
    const result = await sendLedgerEntry(data);
    console.log("Create result:", result);
  }
};

export const formInitialValue: LedgerEntry = {
  id: "",
  date: new Date().toISOString().slice(0, 10),
  description: "",
  ledgerItems: [
    { coa: 0, amount: 0, balanceType: "Debit" },
    { coa: 0, amount: 0, balanceType: "Credit" },
  ],
  timestamp: "",
};
