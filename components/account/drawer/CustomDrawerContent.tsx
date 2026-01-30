import useAuth from "@/hooks/auth/useAuth";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { ViewStyle } from "react-native";
import { Drawer, useTheme } from "react-native-paper";

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const theme = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: theme.colors.surface }}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <Drawer.Section title="Account">
        {props.state.routes.map((route, index) => {
          const { options } = props.descriptors[route.key];
          // Cast to ViewStyle to access display property safely
          const drawerItemStyle = options.drawerItemStyle as ViewStyle;
          if (drawerItemStyle?.display === "none") {
            return null;
          }

          const label =
            options.drawerLabel !== undefined
              ? options.drawerLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = props.state.index === index;

          return (
            <Drawer.Item
              key={route.key}
              label={label as string}
              icon={({ size, color }) => {
                if (options.drawerIcon) {
                  return options.drawerIcon({
                    size,
                    color,
                    focused: isFocused,
                  });
                }
                return null;
              }}
              active={isFocused}
              onPress={() => props.navigation.navigate(route.name)}
              theme={theme}
            />
          );
        })}
      </Drawer.Section>

      <Drawer.Section title="User">
        <Drawer.Item
          label={user?.name || "Profile"}
          icon="account"
          onPress={() => router.push("/login")}
          theme={theme}
        />
        <Drawer.Item
          label="Logout"
          icon="logout"
          onPress={logout}
          theme={theme}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}
