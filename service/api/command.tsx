import useAuth from "@/hooks/auth/useAuth";
import type { AxiosError, AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { axiosCommandClient } from ".";

export function AxiosCommandClientProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const { user, isLoading, getAccessToken } = useAuth();

  useEffect(() => {
    // We check for user existence as a proxy for isAuthenticated since existing codebase used it
    const isAuthenticated = !!user;

    const requestCommandInterceptor =
      axiosCommandClient.interceptors.request.use(async (config) => {
        if (isAuthenticated && !isLoading) {
          try {
            const credentials = await getAccessToken();
            const token = credentials?.accessToken;

            if (token) {
              console.log("Command Token attached");
              config.headers.Authorization = `Bearer ${token}`;
            } else {
              console.log("Command: No token found in credentials");
            }
          } catch (error) {
            console.error("Command: Failed to get token", error);
            // In mobile, we might not want to throw immediately to allow public endpoints if any,
            // but strict port matching to original code suggests throwing.
            throw new Error("Failed to acquire Auth0 token");
          }
        } else if (isLoading) {
          console.log("Command: Auth0 is still loading, deferring request");
          // throw new Error("Auth0 is still initializing");
          // Blocking requests while loading might be aggressive in RN logic if not handled by UI, but keeping consistent.
        } else {
          console.log(
            "Command : No token available for authorization (User not logged in)",
          );
        }
        return config;
      });

    const responseCommandInterceptor =
      axiosCommandClient.interceptors.response.use(
        (response: AxiosResponse) => {
          return response;
        },
        (error: AxiosError) => {
          switch (error.response?.status) {
            case 401:
              console.log("Unauthorized: Token invalid or expired");
              break;
            case 403:
              console.log("Forbidden: Access denied");
              break;

            default:
              break;
          }
          return Promise.reject(error);
        },
      );

    return () => {
      axiosCommandClient.interceptors.request.eject(requestCommandInterceptor);
      axiosCommandClient.interceptors.response.eject(
        responseCommandInterceptor,
      );
    };
  }, [user, isLoading, getAccessToken]);

  return children;
}
