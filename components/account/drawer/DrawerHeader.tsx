import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Appbar, useTheme } from "react-native-paper";

export function DrawerHeader({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) {
  const theme = useTheme();

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
    </Appbar.Header>
  );
}
