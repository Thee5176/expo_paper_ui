# Native Expo Paper 👋

This is an [Expo](https://expo.dev) project using **React Native Paper** for the UI and **Expo Router** for navigation.

## 🚀 Get Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Platform Specific Testing

#### 🌐 Web

To start the web version with HTTPS proxy (recommended for Auth0 testing):

1. **Generate Certificates (`mkcert` recommended)**:

   ```bash
   # Install mkcert (macOS: brew install mkcert, Windows: choco install mkcert)
   mkcert localhost
   ```

   This generates `localhost.pem` and `localhost-key.pem` which are required by the proxy script.

2. **Run with HTTPS**:

   ```bash
   npm run web:https
   ```

   This starts the Expo bundler, local-ssl-proxy, and a redirect server. It will automatically open `https://localhost:8081`.

> **Note**: For more details on the local HTTPS architecture, see [docs/https_architecture.md](docs/https_architecture.md).

#### 🤖 Android

Ensure you have a development client build or are using an emulator.
Check the current EAS build status:

1. **Build locally and test via Android Emulator (require the android studio setup)**

   ```bash
   npx expo prebuild --no-install --platform android
   npm run android:dev #alias npm command in package.json
   ```

2. **Cloud build and Native Device testing via EAS (require the manual development build download to Android Device)**

   ```bash
   eas build --platform android --profile development
   ```

3. Run the development server:

```bash
npx expo start --dev-client
```

> [!NOTE]  
> **iOS Support:** iOS testing is currently not supported due to development hardware restrictions. Support will be added in the future.

---

## 🔐 Auth0 Configuration

**Web Callback URL:**  
`https://localhost:8081`

**Scheme Path:**  
For native authentication to work correctly, ensure the following scheme path is registered in your Auth0 dashboard:
`{AUTH0_CUSTOM_SCHEME}://{AUTH0_DOMAIN}/android/com.thee5176.native_expo_paper/callback`

---

## 🛠️ Learn More

- [Expo documentation](https://docs.expo.dev/)
- [React Native Paper](https://reactnativepaper.com/)
- [Expo Router](https://docs.expo.dev/router/introduction)
