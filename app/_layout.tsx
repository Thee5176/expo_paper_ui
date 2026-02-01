import { ProtectedRoute } from "@/components/ProtectedRoute";
import ProvideAuth from "@/hooks/auth/provider";
import { AxiosCommandClientProvider } from "@/service/api/command";
import { AxiosQueryClientProvider } from "@/service/api/query";
import theme from "@/themes";
import { Stack } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  console.log("Env vars:", {
    domain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID,
    scheme: process.env.EXPO_PUBLIC_AUTH_CUSTOM_SCHEME,
    api: process.env.EXPO_PUBLIC_API_URL,
  });

  const content = (
    <ProvideAuth>
      <AxiosCommandClientProvider>
        <AxiosQueryClientProvider>
          <ProtectedRoute>
            <Stack>
              <Stack.Screen
                name="index"
                options={{ title: "Home", headerShown: false }}
              />
              <Stack.Screen
                name="login"
                options={{
                  title: "Login",
                  presentation: "modal",
                  headerShown: false,
                }}
              />
              <Stack.Screen name="account" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
              <Stack.Screen
                name="+not-found"
                options={{ title: "Page not Found" }}
              />
            </Stack>
          </ProtectedRoute>
        </AxiosQueryClientProvider>
      </AxiosCommandClientProvider>
    </ProvideAuth>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme.dark}>
        <Auth0Provider
          domain={process.env.EXPO_PUBLIC_AUTH_DOMAIN ?? ""}
          clientId={process.env.EXPO_PUBLIC_AUTH_CLIENT_ID ?? ""}
        >
          <SafeAreaProvider>{content}</SafeAreaProvider>
        </Auth0Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
