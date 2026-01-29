import { useAuth } from "@/hooks/useAuth";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import { Drawer, useTheme } from "react-native-paper";

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const theme = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: theme.colors.surface }}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <Drawer.Section title="Account">
        <Drawer.Item
          label="Dashboard"
          icon="view-dashboard"
          active={pathname === "/account"}
          onPress={() => router.push("/account")}
        />
        <Drawer.Item
          label="Entry Form"
          icon="file-document-edit"
          active={pathname === "/account/entryform"}
          onPress={() => router.push("/account/entryform")}
        />
        <Drawer.Item
          label="Statement"
          icon="file-table"
          active={pathname === "/account/statement"}
          onPress={() => router.push("/account/statement")}
        />
        <Drawer.Item
          label="Report"
          icon="chart-bar"
          active={pathname === "/account/report"}
          onPress={() => router.push("/account/report")}
        />
      </Drawer.Section>

      <Drawer.Section title="User">
        <Drawer.Item
          label={user?.name || "Profile"}
          icon="account"
          onPress={() => router.push("/login")}
        />
        <Drawer.Item label="Logout" icon="logout" onPress={logout} />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}
