import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { user, isAuthenticated, login, logout, getAccessToken } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("=== Auth0 User Info ===");
      console.log("User:", JSON.stringify(user, null, 2));
      console.log("Is Authenticated:", isAuthenticated);

      // Test getting access token
      getAccessToken().then((token) => {
        console.log("=== Access Token ===");
        console.log("Token:", token);
      });
    }
  }, [user, isAuthenticated, getAccessToken]);

  const handleLogin = async () => {
    console.log("=== Starting Login ===");
    await login();
  };

  const handleLogout = async () => {
    console.log("=== Starting Logout ===");
    await logout();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Auth0 Login Test
      </Text>

      {isAuthenticated && user ? (
        <View style={styles.userInfo}>
          <Text variant="bodyLarge" style={styles.label}>
            Logged in as:
          </Text>
          <Text variant="titleMedium" style={styles.email}>
            {user.email || user.name || "User"}
          </Text>
          <Button mode="contained" onPress={handleLogout} style={styles.button}>
            Logout
          </Button>
        </View>
      ) : (
        <View style={styles.loginSection}>
          <Text variant="bodyMedium" style={styles.description}>
            Click the button below to login via Auth0
          </Text>
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login with Auth0
          </Button>
        </View>
      )}

      <Text variant="bodySmall" style={styles.note}>
        Check the console for detailed Auth0 logs
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  userInfo: {
    alignItems: "center",
    marginTop: 20,
  },
  loginSection: {
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    marginBottom: 8,
  },
  email: {
    fontWeight: "600",
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  button: {
    marginTop: 10,
    minWidth: 200,
  },
  note: {
    position: "absolute",
    bottom: 40,
    color: "#999",
    fontStyle: "italic",
  },
});
