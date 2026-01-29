import { Link } from "expo-router";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function ModalScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="headlineMedium">This is a modal</Text>
      <Link
        href="/login"
        dismissTo
        style={{ marginTop: 15, paddingVertical: 15 }}
      >
        <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
          Go to home screen
        </Text>
      </Link>
    </View>
  );
}
