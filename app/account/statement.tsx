import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function StatementScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="bodyLarge">
        Edit app/statement.tsx to edit this screen.
      </Text>
    </View>
  );
}
