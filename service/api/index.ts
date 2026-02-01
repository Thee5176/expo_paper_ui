import axios from "axios";

// React Native doesn't have globalThis.location, so we must rely on environment variables.
const host = process.env.EXPO_PUBLIC_API_URL;
console.log("API Host IP (env):", host);

if (!host) {
  throw new Error(
    "EXPO_PUBLIC_API_URL is not defined in environment variables. Please check your .env file.",
  );
}

const COMMAND_PATH: string = `${host}/command/`;
const QUERY_PATH: string = `${host}/query/`;

const axiosClient = (endpoint: string) =>
  axios.create({
    baseURL: endpoint == "command" ? COMMAND_PATH : QUERY_PATH,
    timeout: 3000,
    headers: {
      "Content-Type": "application/json",
    },
    // withCredentials: true // Not typically needed for JWT Bearer token flows in mobile apps
  });

export function setAuthToken(token?: string | null) {
  const header = `Bearer ${token}`;
  axios.defaults.headers.common["Authorization"] = header;
  axiosCommandClient.defaults.headers.common["Authorization"] = header;
  axiosQueryClient.defaults.headers.common["Authorization"] = header;
}

export const axiosCommandClient = axiosClient("command");
export const axiosQueryClient = axiosClient("query");
