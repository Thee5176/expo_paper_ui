import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
          This screen doesn&apos;t exist.
        </Text>

        <Link href="/login" style={{ marginTop: 15, paddingVertical: 15 }}>
          <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
