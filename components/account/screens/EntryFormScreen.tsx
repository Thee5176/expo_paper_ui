import MultiStepForm from "@/components/ledger_form/MultiStepForm";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EntryFormScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <MultiStepForm />
    </SafeAreaView>
  );
}
