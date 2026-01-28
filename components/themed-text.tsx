import { StyleSheet, Text, TextProps } from "react-native";
import { useColorScheme } from "../hooks/useColorScheme";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "subtitle" | "link";
};

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme() ?? "light";
  const color = colorScheme === "dark" ? "#ECEDEE" : "#11181C";
  const linkColor = colorScheme === "dark" ? "#0a7ea4" : "#0a7ea4";

  return (
    <Text
      style={[
        { color: type === "link" ? linkColor : color },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
  },
});
