import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { Drawer } from "react-native-paper";

export function CustomDrawerContent() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
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
          onPress={() => {}}
        />
        <Drawer.Item label="Logout" icon="logout" onPress={logout} />
      </Drawer.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
