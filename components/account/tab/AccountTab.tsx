import DashboardScreen from "@/components/account/screens/DashboardScreen";
import EntryFormScreen from "@/components/account/screens/EntryFormScreen";
import ProfileScreen from "@/components/account/screens/ProfileScreen";
import ReportScreen from "@/components/account/screens/ReportScreen";
import StatementScreen from "@/components/account/screens/StatementScreen";
import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";

export default function AccountTabs() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "dashboard",
      title: "Dashboard",
      focusedIcon: "view-dashboard",
      unfocusedIcon: "view-dashboard-outline",
    },
    {
      key: "entry",
      title: "Entry",
      focusedIcon: "file-document-edit",
      unfocusedIcon: "file-document-edit-outline",
    },
    {
      key: "statement",
      title: "Statement",
      focusedIcon: "table",
      unfocusedIcon: "table-large",
    },
    {
      key: "report",
      title: "Report",
      focusedIcon: "chart-bar",
      unfocusedIcon: "chart-bar",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: DashboardScreen,
    entry: EntryFormScreen,
    statement: StatementScreen,
    report: ReportScreen,
    profile: ProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
