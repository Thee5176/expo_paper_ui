# Expo Config Plugins vs. Babel Plugins

This document explains why certain packages should or should not be added to the `plugins` array in `app.json` or `app.config.js`.

## What are Expo Config Plugins?

Expo Config Plugins are functions that run during the **Prebuild** process. Their primary purpose is to **automatically modify native Android and iOS source code** (like `AndroidManifest.xml`, `Info.plist`, `MainActivity.java`, etc.) based on your Expo configuration.

### When to use them:

- When a library requires native setup that isn't handled by Expo automatically.
- Example: `react-native-auth0` needs a plugin to register its Redirect URI and custom scheme in the native manifest files.

## Why `axios` is NOT an Expo Plugin

`axios` is a pure JavaScript library for making HTTP requests. It:

- Does **not** interact with native APIs.
- Does **not** require modifications to Android or iOS native code.
- Is used entirely within your JavaScript/TypeScript application logic.

Including `"axios"` in the `plugins` array will cause an error because Expo expects to find a `withAxios` or `app.plugin.js` file that contains native modification logic, which `axios` doesn't have.

## Why `react-native-paper/babel` is NOT an Expo Plugin

`react-native-paper/babel` is a **Babel plugin**, which is different from an **Expo Config plugin**.

- **Babel Plugins**: Modify your **JavaScript code** during compilation (e.g., to optimize imports and reduce bundle size).
- **Expo Config Plugins**: Modify your **Native code** during prebuild.

`react-native-paper/babel` is used to optimize the build by ensuring only the components you use are included in the final bundle.

### Where should Babel plugins go?

Babel plugins should be defined in a `babel.config.js` or `.babelrc` file at the root of your project:

```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
```

> [!NOTE]
> Since this project uses Expo 54 and newer architectures, many Babel configurations are managed automatically. Only add plugins to `babel.config.js` if manually requested by a library's documentation.

## Summary Table

| Category            | Expo Config Plugin                       | Babel Plugin               | JS Library        |
| :------------------ | :--------------------------------------- | :------------------------- | :---------------- |
| **Purpose**         | Modifies Native Files (`.xml`, `.plist`) | Modifies JS Source Code    | Application Logic |
| **Config Location** | `app.json` (`plugins`)                   | `babel.config.js`          | `import` in code  |
| **Example**         | `react-native-auth0`                     | `react-native-paper/babel` | `axios`           |
