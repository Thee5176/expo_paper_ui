import * as dotenv from "dotenv";
import { ConfigContext, ExpoConfig } from "expo/config";

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log(config.name);
  return {
    ...config,
    name: config.name ?? "native_expo_paper",
    slug: config.slug ?? "native_expo_paper",
    plugins: [
      ...((config.plugins as any[]) || []),
      [
        "react-native-auth0",
        {
          domain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
          customScheme: process.env.EXPO_PUBLIC_AUTH0_CUSTOM_SCHEME,
        },
      ],
    ],
  };
};
