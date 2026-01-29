import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AxiosCommandClientProvider } from "@/service/api/command";
import { AxiosQueryClientProvider } from "@/service/api/query";
import theme from "@/theme";
import { Stack } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  console.log("Env vars:", {
    domain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID,
    scheme: process.env.EXPO_PUBLIC_AUTH_CUSTOM_SCHEME,
    api: process.env.EXPO_PUBLIC_API_URL,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme.dark}>
        <Auth0Provider
          domain={process.env.EXPO_PUBLIC_AUTH_DOMAIN ?? ""}
          clientId={process.env.EXPO_PUBLIC_AUTH_CLIENT_ID ?? ""}
        >
          <AxiosCommandClientProvider>
            <AxiosQueryClientProvider>
              <ProtectedRoute>
                <Stack>
                  <Stack.Screen
                    name="login"
                    options={{ title: "Login", headerShown: false }}
                  />
                  <Stack.Screen
                    name="account"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="modal"
                    options={{ presentation: "modal" }}
                  />
                  <Stack.Screen
                    name="+not-found"
                    options={{ title: "Oops!" }}
                  />
                </Stack>
              </ProtectedRoute>
            </AxiosQueryClientProvider>
          </AxiosCommandClientProvider>
        </Auth0Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
