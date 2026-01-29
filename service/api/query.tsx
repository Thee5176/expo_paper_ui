import { useAuth0 } from "react-native-auth0";
import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { axiosQueryClient } from ".";
import React from "react";

//Config Query API Endpoint
export function AxiosQueryClientProvider({children}: {readonly children: React.ReactNode}) {
  const { user, isLoading, getCredentials } = useAuth0();
    
  useEffect(() => {
      const isAuthenticated = !!user;

      const requestQueryInterceptor = axiosQueryClient.interceptors.request.use(async (config) => {
            if (isAuthenticated && !isLoading) {
              try {
                const credentials = await getCredentials();
                const token = credentials?.accessToken;

                if (token) {
                   console.log("Query Token attached");
                   config.headers.Authorization = `Bearer ${token}`;
                } else {
                   console.log("Query: No token found in credentials");
                }
              } catch (error) {
                console.error("Query: Failed to get token", error);
                throw new Error("Failed to acquire Auth0 token");
              }
            } else if (isLoading) {
              console.log("Query: Auth0 is still loading, deferring request");
            } else {
              console.log("Query : No token available for authorization"); 
            }
            return config;
            }
          )
      
          const responseQueryInterceptor = axiosQueryClient.interceptors.response.use(
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
            }
          )
      
          return () => {
            axiosQueryClient.interceptors.request.eject(requestQueryInterceptor)
            axiosQueryClient.interceptors.response.eject(responseQueryInterceptor)
          }
      
        }, [user, isLoading, getCredentials])

  return(<>{children}</>);
}
