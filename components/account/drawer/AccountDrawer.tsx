import { MaterialIcons } from "@expo/vector-icons";
import Drawer from "expo-router/drawer";
import React from "react";
import { useTheme } from "react-native-paper";
import { CustomDrawerContent } from "./CustomDrawerContent";
import { DrawerHeader } from "./DrawerHeader";

export default function AccountDrawer() {
  const theme = useTheme();
  return (
    <Drawer
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: "permanent",
        headerShown: false,
        drawerStyle: {
          width: 280,
          backgroundColor: theme.colors.surface,
          borderRightColor: theme.colors.outlineVariant,
          borderRightWidth: 1,
        },
        header: (props: any) => <DrawerHeader {...props} />,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="entryform"
        options={{
          title: "Entry Form",
          drawerLabel: "Entry Form",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="edit-document" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="statement"
        options={{
          title: "Statement",
          drawerLabel: "Statement",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="table-view" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="report"
        options={{
          title: "Report",
          drawerLabel: "Report",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerLabel: "Profile",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
