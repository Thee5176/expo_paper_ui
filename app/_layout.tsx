import { Stack } from "expo-router";
import { Auth0Provider } from "react-native-auth0";

export default function RootLayout() {
  return (
    <Auth0Provider
      domain={process.env.EXPO_PUBLIC_AUTH_DOMAIN ?? ""}
      clientId={process.env.EXPO_PUBLIC_AUTH0_CUSTOM_SCHEME ?? ""}
    >
      <Stack>
        <Stack.Screen name="statement" options={{ title: "Statement" }} />

        <Stack.Screen name="login" options={{ title: "Login" }} />
      </Stack>
    </Auth0Provider>
  );
}
