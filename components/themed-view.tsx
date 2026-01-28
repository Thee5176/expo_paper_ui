import { View, ViewProps } from "react-native";
import { useColorScheme } from "../hooks/useColorScheme";

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...rest }: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? "light";
  const backgroundColor = colorScheme === "dark" ? "#151718" : "#FFFFFF";

  return <View style={[{ backgroundColor }, style]} {...rest} />;
}
