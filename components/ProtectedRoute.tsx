import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import useAuth from "../hooks/auth/useAuth";
import theme from "../themes";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [hasTimedOut, setHasTimedOut] = useState(false);

  // Timeout fallback for stuck isLoading state (web platform issue with react-native-auth0)
  useEffect(() => {
    if (!isLoading) {
      setHasTimedOut(false);
      return;
    }

    const timer = setTimeout(() => {
      if (isLoading) {
        console.warn(
          "[ProtectedRoute] Auth loading timeout (3s) - proceeding anyway. " +
            "This is expected on web platform where Auth0 isLoading may not resolve.",
        );
        setHasTimedOut(true);
      }
    }, 3000); // 3 second timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const currentRoute = segments[0];

    // Define public routes that don't require authentication
    const publicRoutes = ["login", "+not-found"];
    const isPublicRoute = publicRoutes.includes(currentRoute);

    // Redirect logic
    if (!isAuthenticated && !isPublicRoute) {
      // User is not authenticated and trying to access a protected route
      router.replace("/login");
    } else if (isAuthenticated && currentRoute === "login") {
      // User is authenticated but on the login page
      router.replace("/account");
    }
  }, [isAuthenticated, segments, isLoading, router]);

  // Show loading spinner while checking authentication (with timeout fallback)
  if (isLoading && !hasTimedOut) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.dark.colors.background,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
