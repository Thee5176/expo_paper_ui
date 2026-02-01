import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
        Account Overview
      </Text>
    </SafeAreaView>
  );
}
