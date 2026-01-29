import Constants, { ExecutionEnvironment } from "expo-constants";

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export const useAuth = () => {
  // Safe hook call pattern for Expo Go
  let auth0 = null;
  if (!isExpoGo) {
    try {
      const { useAuth0 } = require("react-native-auth0");
      auth0 = useAuth0();
    } catch (e) {
      console.warn("Failed to load react-native-auth0", e);
    }
  }

  const {
    user = null,
    isLoading = false,
    authorize = async () => {},
    clearSession = async () => {},
    getCredentials = async () => null,
  } = auth0 || {};

  const login = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log("Login cancelled or failed", e);
    }
  };

  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Logout cancelled or failed", e);
    }
  };

  const getAccessToken = async () => {
    try {
      const credentials = await getCredentials();
      return credentials?.accessToken;
    } catch (e) {
      console.error(e);
      return null;
    }
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
};
