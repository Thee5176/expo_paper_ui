import { Stack } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import { AxiosCommandClientProvider } from "../service/api/command";
import { AxiosQueryClientProvider } from "../service/api/query";

export default function RootLayout() {
  console.log("Env vars:", {
    domain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
    scheme: process.env.EXPO_PUBLIC_AUTH0_CUSTOM_SCHEME,
    api: process.env.EXPO_PUBLIC_API_URL,
  });

  return (
    <Auth0Provider
      domain={process.env.EXPO_PUBLIC_AUTH_DOMAIN ?? ""}
      clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID ?? ""}
    >
      <AxiosCommandClientProvider>
        <AxiosQueryClientProvider>
          <Stack>
            <Stack.Screen name="statement" options={{ title: "Statement" }} />
            <Stack.Screen name="login" options={{ title: "Login" }} />
          </Stack>
        </AxiosQueryClientProvider>
      </AxiosCommandClientProvider>
    </Auth0Provider>
  );
}
