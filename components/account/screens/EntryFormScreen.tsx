import MultiStepForm from "@/components/ledger_form/MultiStepForm";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export default function EntryFormScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <MultiStepForm />
    </View>
  );
}
