# Local HTTPS Architecture

This project uses a proxy-based approach to serve the application over HTTPS locally. This is necessary because Expo Web's default HTTPS implementation can sometimes be tricky or deprecated in favor of tunneling, but a local proxy offers a stable alternative for local development requiring SSL (e.g., for Auth0 testing).

## Components

1. **Expo Web Server (`port 9001`)**
   - Starts via `expo start --web --port 9001`.
   - Serves the React Native Web bundle.
   - Runs in **HTTP** mode (unencrypted).

2. **SSL Proxy (`port 8081`)**
   - Uses `local-ssl-proxy`.
   - Listens on **HTTPS** port `8081`.
   - Forwarding logic: `https://localhost:8081` -> `http://localhost:9001`.
   - Requires `localhost.pem` (certificate) and `localhost-key.pem` (private key).

3. **HTTP Redirect Server (`port 8080`)**
   - A simple Node.js script (`scripts/http-redirect.js`).
   - Listens on **HTTP** port `8080`.
   - Redirects any request from `http://localhost:8080` to `https://localhost:8081`.
   - Useful if you accidentally type the wrong protocol or need a standard HTTP entry point that upgrades to HTTPS.

## How it works when you run `npm run web:https`

The `concurrently` package runs all three services simultaneously:

1. React Native Web packager starts building your app.
2. The Proxy starts listening for secure requests.
3. The Redirect server stands by.

You should access the app via **`https://localhost:8081`**.
