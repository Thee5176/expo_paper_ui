import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AxiosCommandClientProvider } from "@/service/api/command";
import { AxiosQueryClientProvider } from "@/service/api/query";
import theme from "@/theme";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

// Dynamically load Auth0Provider to avoid crash in Expo Go
let Auth0Provider: any = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
if (!isExpoGo) {
  try {
    Auth0Provider = require("react-native-auth0").Auth0Provider;
  } catch (e) {
    console.warn("Failed to load react-native-auth0", e);
  }
}

export default function RootLayout() {
  console.log("Env vars:", {
    domain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID,
    scheme: process.env.EXPO_PUBLIC_AUTH_CUSTOM_SCHEME,
    api: process.env.EXPO_PUBLIC_API_URL,
    isExpoGo,
  });

  const content = (
    <AxiosCommandClientProvider>
      <AxiosQueryClientProvider>
        <ProtectedRoute>
          <Stack>
            <Stack.Screen
              name="login"
              options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen name="account" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
          </Stack>
        </ProtectedRoute>
      </AxiosQueryClientProvider>
    </AxiosCommandClientProvider>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme.dark}>
        {!isExpoGo ? (
          <Auth0Provider
            domain={process.env.EXPO_PUBLIC_AUTH_DOMAIN ?? ""}
            clientId={process.env.EXPO_PUBLIC_AUTH_CLIENT_ID ?? ""}
          >
            {content}
          </Auth0Provider>
        ) : (
          content
        )}
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
