import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useAuth0 } from "react-native-auth0";

export default function useProvideAuth() {
  const router = useRouter();
  const { user, authorize, clearSession, isLoading, getCredentials } =
    useAuth0();

  const login = async () => {
    try {
      await authorize(
        {
          scope: "openid profile email user",
        },
        {
          customScheme:
            Constants.expoConfig?.extra?.AUTH_CUSTOM_SCHEME ??
            "nativeexpopaper",
        },
      );
      router.replace("/account");
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const logout = async () => {
    try {
      await clearSession(
        {},
        {
          customScheme:
            Constants.expoConfig?.extra?.AUTH_CUSTOM_SCHEME ??
            "nativeexpopaper",
        },
      );
      router.replace("/login");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const getAccessToken = async () => {
    return await getCredentials();
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    getAccessToken,
    hasValidCredentials: !!user,
  };
}
