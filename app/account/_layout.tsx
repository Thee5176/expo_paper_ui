import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Account",
        }}
      />
      <Tabs.Screen
        name="entryform"
        options={{
          title: "Entry Form",
        }}
      />
      <Tabs.Screen
        name="statement"
        options={{
          title: "Statement",
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
        }}
      />
    </Tabs>
  );
}
