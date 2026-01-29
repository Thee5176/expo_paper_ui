import { useAuth0 } from "react-native-auth0";

export const useAuth = () => {
  const {
    user,
    isLoading,
    authorize,
    clearSession,
    getCredentials,
    hasValidCredentials,
  } = useAuth0();

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
    hasValidCredentials,
  };
};
