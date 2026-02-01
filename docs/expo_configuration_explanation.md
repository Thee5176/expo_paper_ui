# Expo Configuration: `app.json` vs `app.config.js`

This document explains the difference between `app.json` and `app.config.js`,
and why we use both in this project.

## `app.json` vs `app.config.js`

### 1. `app.json` (Static Configuration)

- **Format**: JSON (Static, no code execution).
- **Purpose**: Defines standard, constant configuration values for your Expo app.
- **Examples**: App name, slug, version, orientation, icon paths, splash
  screen settings.
- **Limitation**: Cannot read environment variables (like
  `process.env.AUTH_DOMAIN`) or execute logic.

### 2. `app.config.js` (Dynamic Configuration)

- **Format**: JavaScript (Node.js module).
- **Purpose**: Generates configuration dynamically. It can read the static
  `app.json`, modify it, and return the final configuration.
- **Key Feature**: Can access `process.env` to read environment variables (e.g.,
  from a `.env` file via `dotenv`).

## Why "Add to Two Places"?

We are **not** duplicating configuration. Instead, we are using a **layering**
approach:

1. **Base Layer (`app.json`)**: Contains all the static settings that don't
   change (icons, names, etc.).
2. **Dynamic Layer (`app.config.js`)**:
   - Imports the base config from `app.json` (passed as the `config` argument).
   - **Injects** dynamic values (Environment Variables).
   - Returns the **merged** result.

If `app.config.js` exists, Expo uses it as the source of truth. It effectively
"wraps" `app.json`.

## The `extra` Object and Environment Variables

You likely noticed we added an `extra` object in `app.config.js`:

```javascript
extra: {
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  // ...
}
```

### Why is this necessary?

- **Native Apps (iOS/Android)**: Can often access build-time env vars
  differently, or use plugins that inject them.
- **Reference**: `react-native-auth0` requires some values at build time for
  native files (AndroidManifest, Info.plist). The plugin in `app.config.js`
  handles this.
- **Web / JS Bundle**: The client-side JavaScript bundle (running in the
  browser) **cannot** access `process.env` from your development machine.
- **Solution**: Expo provides the `extra` object. Values put here are serialized
  into the app's manifest. `expo-constants` allows the client-side code
  (`Constants.expoConfig.extra`) to read these values.

### Summary

- **`app.json`**: Static defaults.
- **`app.config.js`**: Adds Environment Variables and Dynamic Logic.
- **`extra`**: Bridges the gap to let the running app (especially Web) see those
  Environment Variables.
