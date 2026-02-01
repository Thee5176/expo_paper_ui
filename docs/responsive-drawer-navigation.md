# Responsive Drawer Navigation Implementation

This document explains how to implement a responsive drawer navigation that uses React Native Paper's Drawer components for web mode and native drawer for mobile platforms.

## Overview

The implementation provides:

- **Web Mode**: Permanent sidebar using React Native Paper's `Drawer.Section` and `Drawer.Item`
- **Mobile Mode**: Slide-out drawer with swipe gestures
- **Automatic Platform Detection**: Uses `Platform.OS` to determine which drawer type to render
- **Themed UI**: Integrates with your existing React Native Paper theme

## Architecture

```
app/
├── _layout.tsx                      # Root layout with GestureHandlerRootView
└── account/
    ├── _layout.tsx                  # Drawer navigator (responsive)
    ├── index.tsx                    # Dashboard screen
    ├── entryform.tsx                # Entry Form screen
    ├── statement.tsx                # Statement screen
    └── report.tsx                   # Report screen

components/
└── CustomDrawerContent.tsx          # Paper Drawer UI for web
```

## Implementation

### 1. Custom Drawer Content Component

**`components/CustomDrawerContent.tsx`**:

```tsx
import { Drawer } from "react-native-paper";
import { useRouter, usePathname } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export function CustomDrawerContent() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Drawer.Section title="Account">
        <Drawer.Item
          label="Dashboard"
          icon="view-dashboard"
          active={pathname === "/account"}
          onPress={() => router.push("/account")}
        />
        <Drawer.Item
          label="Entry Form"
          icon="file-document-edit"
          active={pathname === "/account/entryform"}
          onPress={() => router.push("/account/entryform")}
        />
        <Drawer.Item
          label="Statement"
          icon="file-table"
          active={pathname === "/account/statement"}
          onPress={() => router.push("/account/statement")}
        />
        <Drawer.Item
          label="Report"
          icon="chart-bar"
          active={pathname === "/account/report"}
          onPress={() => router.push("/account/report")}
        />
      </Drawer.Section>

      <Drawer.Section title="User">
        <Drawer.Item
          label={user?.name || "Profile"}
          icon="account"
          onPress={() => {}}
        />
        <Drawer.Item label="Logout" icon="logout" onPress={logout} />
      </Drawer.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### 2. Account Layout with Responsive Drawer

**`app/account/_layout.tsx`**:

```tsx
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Platform } from "react-native";
import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { Appbar, useTheme } from "react-native-paper";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// Custom header component for drawer
function DrawerHeader({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) {
  const theme = useTheme();

  const getTitle = (routeName: string) => {
    switch (routeName) {
      case "index":
        return "Dashboard";
      case "entryform":
        return "Entry Form";
      case "statement":
        return "Statement";
      case "report":
        return "Report";
      default:
        return "Account";
    }
  };

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title={getTitle(route.name)} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
}

export default function AccountLayout() {
  const isWeb = Platform.OS === "web";

  return (
    <Drawer
      drawerContent={(props: any) => <CustomDrawerContent />}
      screenOptions={{
        drawerType: isWeb ? "permanent" : "slide",
        drawerStyle: {
          width: isWeb ? 280 : 240,
        },
        header: (props: any) => <DrawerHeader {...props} />,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="entryform"
        options={{
          title: "Entry Form",
          drawerLabel: "Entry Form",
        }}
      />
      <Drawer.Screen
        name="statement"
        options={{
          title: "Statement",
          drawerLabel: "Statement",
        }}
      />
      <Drawer.Screen
        name="report"
        options={{
          title: "Report",
          drawerLabel: "Report",
        }}
      />
    </Drawer>
  );
}
```

### 3. Root Layout with Gesture Handler

**`app/_layout.tsx`** (updated):

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
// ... other imports

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme.dark}>
        {/* ... rest of your providers */}
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
```

## Dependencies

Install the required packages:

```bash
npx expo install @react-navigation/drawer react-native-drawer-layout react-native-gesture-handler react-native-reanimated
```

## Configuration Options

### Drawer Types

| Type        | Description                     | Use Case                      |
| ----------- | ------------------------------- | ----------------------------- |
| `permanent` | Always visible sidebar          | Desktop/web with wide screens |
| `slide`     | Slides over content             | Mobile devices                |
| `front`     | Drawer in front of content      | Alternative mobile style      |
| `back`      | Content slides to reveal drawer | Alternative mobile style      |

### Platform Detection

```tsx
const isWeb = Platform.OS === "web";
const isLargeScreen = useWindowDimensions().width >= 768;

// Combine conditions
drawerType: isWeb || isLargeScreen ? "permanent" : "slide";
```

## Customization

### Adding New Drawer Items

In `CustomDrawerContent.tsx`:

```tsx
<Drawer.Section title="Reports">
  <Drawer.Item
    label="Analytics"
    icon="chart-line"
    active={pathname === "/account/analytics"}
    onPress={() => router.push("/account/analytics")}
  />
</Drawer.Section>
```

### Styling the Drawer

```tsx
<Drawer
  screenOptions={{
    drawerStyle: {
      width: isWeb ? 280 : 240,
      backgroundColor: theme.colors.surface,
    },
    drawerActiveTintColor: theme.colors.primary,
    drawerInactiveTintColor: theme.colors.onSurface,
  }}
/>
```

### Custom Header Actions

```tsx
<Appbar.Header>
  <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
  <Appbar.Content title={title} />
  <Appbar.Action
    icon="bell"
    onPress={() => {
      /* notifications */
    }}
  />
  <Appbar.Action
    icon="cog"
    onPress={() => {
      /* settings */
    }}
  />
</Appbar.Header>
```

## Troubleshooting

### Issue: Module Resolution Errors

**Symptom**:

```
Unable to resolve "@react-navigation/drawer"
Unable to resolve "react-native-drawer-layout"
```

**Solution**:

1. Clear Metro bundler cache:

   ```bash
   npx expo start --clear
   ```

2. Reinstall dependencies:

   ```bash
   rm -rf node_modules
   npm install
   ```

3. Ensure all peer dependencies are installed:
   ```bash
   npx expo install @react-navigation/drawer react-native-drawer-layout react-native-gesture-handler react-native-reanimated
   ```

### Issue: Drawer Not Swipeable on Mobile

**Solution**: Ensure `GestureHandlerRootView` wraps your entire app in `_layout.tsx`:

```tsx
<GestureHandlerRootView style={{ flex: 1 }}>
  {/* Your app content */}
</GestureHandlerRootView>
```

### Issue: Drawer Not Showing on Web

**Solution**: Check that `drawerType` is set to `"permanent"` for web:

```tsx
drawerType: Platform.OS === "web" ? "permanent" : "slide";
```

## Best Practices

### 1. Responsive Width

```tsx
import { useWindowDimensions } from "react-native";

const { width } = useWindowDimensions();
const drawerWidth = width >= 1200 ? 300 : width >= 768 ? 280 : 240;

<Drawer
  screenOptions={{
    drawerStyle: { width: drawerWidth },
  }}
/>;
```

### 2. Active State Management

Use `usePathname()` to highlight the current route:

```tsx
const pathname = usePathname();

<Drawer.Item
  active={pathname === "/account/dashboard"}
  // or for nested routes:
  active={pathname.startsWith("/account/settings")}
/>;
```

### 3. Accessibility

```tsx
<Drawer.Item
  label="Dashboard"
  icon="view-dashboard"
  accessibilityLabel="Navigate to Dashboard"
  accessibilityHint="Opens the main dashboard view"
/>
```

### 4. Theming

Leverage your Paper theme for consistent styling:

```tsx
const theme = useTheme();

<Drawer.Item
  style={{
    backgroundColor: active ? theme.colors.primaryContainer : "transparent",
  }}
  labelStyle={{
    color: active ? theme.colors.onPrimaryContainer : theme.colors.onSurface,
  }}
/>;
```

## Migration from Tabs

If migrating from tab navigation:

1. Replace `<Tabs>` with `<Drawer>` in layout
2. Change `<Tabs.Screen>` to `<Drawer.Screen>`
3. Update screen options:

   ```tsx
   // Before (Tabs)
   <Tabs.Screen
     name="index"
     options={{ title: "Home", tabBarIcon: "home" }}
   />

   // After (Drawer)
   <Drawer.Screen
     name="index"
     options={{ title: "Home", drawerLabel: "Home" }}
   />
   ```

4. Create custom drawer content for icons

## Performance Considerations

### Lazy Loading

```tsx
<Drawer
  screenOptions={{
    lazy: true, // Load screens only when accessed
    unmountOnBlur: false, // Keep state when navigating away
  }}
/>
```

### Memoization

```tsx
const DrawerContent = React.memo(CustomDrawerContent);

<Drawer drawerContent={(props) => <DrawerContent />} />;
```

## Summary

This responsive drawer implementation provides:

✅ **Platform-aware UI** - Permanent sidebar on web, slide-out on mobile  
✅ **React Native Paper integration** - Themed, accessible drawer components  
✅ **Gesture support** - Swipe to open/close on mobile  
✅ **Custom header** - Material Design Appbar with drawer toggle  
✅ **Active state tracking** - Highlights current route  
✅ **Scalable architecture** - Easy to add new sections and items

## Next Steps

1. **Test on all platforms** (web, iOS, Android)
2. **Add user avatar** to drawer header
3. **Implement drawer footer** with app version/settings
4. **Add nested navigation** for complex sections
5. **Customize animations** for drawer open/close

## References

- [React Native Paper Drawer](https://callstack.github.io/react-native-paper/docs/components/Drawer/)
- [Expo Router Drawer](https://docs.expo.dev/router/advanced/drawer/)
- [React Navigation Drawer](https://reactnavigation.org/docs/drawer-navigator/)
