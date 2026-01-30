import AccountDrawer from "@/components/account/drawer/AccountDrawer";
import AccountTabs from "@/components/account/tab/AccountTab";
import React from "react";
import { Platform } from "react-native";

export default function AccountLayout() {
  return Platform.OS === "web" ? <AccountDrawer /> : <AccountTabs />;
}
