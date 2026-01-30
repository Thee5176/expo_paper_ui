import useAuth from "@/hooks/auth/useAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function Redirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/account");
      } else {
        router.replace("/login");
      }
    }
  }, [user, isLoading, router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <ActivityIndicator
        animating={true}
        color={theme.colors.primary}
        size="large"
      />
    </View>
  );
}
