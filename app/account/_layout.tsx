import AccountDrawer from "@/components/account/drawer/AccountDrawer";
import AccountTabs from "@/components/account/tab/AccountTab";
import ProvideCoa from "@/hooks/coa/provider";
import React from "react";
import { Platform } from "react-native";

export default function AccountLayout() {
  return (
    <ProvideCoa>
      {Platform.OS === "web" ? <AccountDrawer /> : <AccountTabs />}
    </ProvideCoa>
  );
}
