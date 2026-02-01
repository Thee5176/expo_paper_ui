import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="bodyLarge">Edit app/report.tsx to edit this screen.</Text>
    </SafeAreaView>
  );
}
