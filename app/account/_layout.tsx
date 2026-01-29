import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Platform } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

// Custom header component for drawer
function DrawerHeader({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) {
  const theme = useTheme();
  const router = useRouter();

  // Get title based on route name
  const getTitle = (routeName: string) => {
    switch (routeName) {
      case "index":
        return "Dashboard";
      case "entryform":
        return "Entry Form";
      case "statement":
        return "Statement";
      case "report":
        return "Report";
      default:
        return "Account";
    }
  };

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title={getTitle(route.name)} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
}

export default function AccountLayout() {
  const isWeb = Platform.OS === "web";
  const theme = useTheme();

  return (
    <Drawer
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: isWeb ? "permanent" : "slide",
        headerShown: !isWeb,
        drawerStyle: {
          width: isWeb ? 280 : 240,
          backgroundColor: theme.colors.surface,
          borderRightColor: theme.colors.outlineVariant,
          borderRightWidth: isWeb ? 1 : 0,
        },
        header: (props: any) => <DrawerHeader {...props} />,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="entryform"
        options={{
          title: "Entry Form",
          drawerLabel: "Entry Form",
        }}
      />
      <Drawer.Screen
        name="statement"
        options={{
          title: "Statement",
          drawerLabel: "Statement",
        }}
      />
      <Drawer.Screen
        name="report"
        options={{
          title: "Report",
          drawerLabel: "Report",
        }}
      />
    </Drawer>
  );
}
