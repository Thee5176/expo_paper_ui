import useAuth from "@/hooks/auth/useAuth";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Avatar.Icon
          size={100}
          icon="account"
          style={{ backgroundColor: theme.colors.primaryContainer }}
        />
        <Text variant="headlineMedium" style={styles.name}>
          {user?.name || "User"}
        </Text>
        <Text variant="bodyLarge" style={styles.email}>
          {user?.email || "No email"}
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={logout}
            style={styles.button}
            icon="logout"
          >
            Logout
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  name: {
    marginTop: 16,
    fontWeight: "bold",
  },
  email: {
    marginTop: 8,
    opacity: 0.7,
  },
  buttonContainer: {
    marginTop: 40,
    width: "100%",
    maxWidth: 300,
  },
  button: {
    borderRadius: 8,
  },
});
