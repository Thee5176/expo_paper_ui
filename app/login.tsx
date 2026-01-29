import { View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen() {
  const { login, logout, user, isLoading, getAccessToken } = useAuth();
  const theme = useTheme();

  const onLogin = async () => {
    try {
      await login();
      const token = await getAccessToken();
      console.log("Logged in:", user);
      console.log("Access Token:", token);
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await logout();
      console.log("Logged out");
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
        padding: 20,
      }}
    >
      <Card style={{ width: "100%", maxWidth: 400 }}>
        <Card.Content style={{ alignItems: "center", gap: 20 }}>
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.primary }}
          >
            Log in via SSO service
          </Text>

          {user && (
            <View style={{ alignItems: "center", gap: 8 }}>
              <Text variant="bodyLarge">You are logged in as:</Text>
              <Text variant="titleMedium" style={{ fontWeight: "normal" }}>
                {user.name}
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.secondary }}
              >
                {user.email}
              </Text>
            </View>
          )}

          {!user && (
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              Please sign in to continue accessing your accounting dashboard.
            </Text>
          )}

          <View style={{ width: "100%", gap: 10, marginTop: 10 }}>
            {!user ? (
              <Button
                mode="contained"
                onPress={onLogin}
                loading={isLoading}
                disabled={isLoading}
                icon="login"
              >
                Log In with Auth0
              </Button>
            ) : (
              <Button
                mode="outlined"
                onPress={onLogout}
                loading={isLoading}
                disabled={isLoading}
                icon="logout"
              >
                Log Out
              </Button>
            )}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
