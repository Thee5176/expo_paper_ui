require("dotenv").config();

module.exports = ({ config }) => {
  return {
    ...config,
    plugins: [
      ...(config.plugins || []),
      [
        "react-native-auth0",
        {
          domain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
          customScheme: process.env.EXPO_PUBLIC_AUTH_CUSTOM_SCHEME,
        },
      ],
    ],
  };
};
