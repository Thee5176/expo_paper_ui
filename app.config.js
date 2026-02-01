require("dotenv").config();

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
      AUTH_CUSTOM_SCHEME: process.env.AUTH_CUSTOM_SCHEME,
      API_URL: process.env.API_URL,
    },
    plugins: [
      ...(config.plugins || []),
      [
        "react-native-auth0",
        {
          domain: process.env.AUTH_DOMAIN,
          customScheme: process.env.AUTH_CUSTOM_SCHEME,
        },
      ],
    ],
  };
};
