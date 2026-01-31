import { useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import useStepper from "../../../hooks/stepper/useStepper";
import type { LedgerEntry } from "../../../types/ledger";
import DateField from "../FormFields/DateField";
import DescriptionField from "../FormFields/DescriptionField";
import LedgerItemsList from "../LedgerItemsList";

export default function EntryForm() {
  const { next, reset: resetStepper } = useStepper();
  const { reset, trigger } = useFormContext<LedgerEntry>();

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      next();
    }
  };

  const handleReset = () => {
    reset();
    resetStepper();
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineLarge" style={styles.title}>
            Entry Form
          </Text>

          <View style={styles.fields}>
            <DateField />
            <DescriptionField />
          </View>
        </Card.Content>
      </Card>

      <LedgerItemsList />

      <View style={styles.actions}>
        <Button mode="outlined" onPress={handleReset} style={styles.button}>
          Reset
        </Button>
        <Button mode="contained" onPress={handleNext} style={styles.button}>
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
    alignSelf: "center",
  },
  fields: {
    gap: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
