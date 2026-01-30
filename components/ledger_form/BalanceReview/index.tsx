import { useFormContext } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, DataTable, Text } from "react-native-paper";
import { useCoa } from "../../../hooks/coa/useCoa";
import { useFormSubmission } from "../../../hooks/form/FormSubmissionContext";
import useStepper from "../../../hooks/stepper/useStepper";
import type { LedgerEntry } from "../../../types/ledger";

export default function BalanceReview() {
  const { back } = useStepper();
  const { watch, handleSubmit } = useFormContext<LedgerEntry>();
  const { getAccountName } = useCoa();
  const { handleSubmit: onSubmit } = useFormSubmission();

  const formData = watch();
  const { date, description, ledgerItems } = formData;

  // Calculate totals
  const debitTotal = ledgerItems
    .filter((item) => item.balanceType === "Debit")
    .reduce((sum, item) => sum + (item.amount || 0), 0);

  const creditTotal = ledgerItems
    .filter((item) => item.balanceType === "Credit")
    .reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Balance Review
          </Text>

          <View style={styles.section}>
            <Text variant="labelLarge">Date:</Text>
            <Text variant="bodyLarge">{date}</Text>
          </View>

          <View style={styles.section}>
            <Text variant="labelLarge">Description:</Text>
            <Text variant="bodyLarge">{description}</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.subtitle}>
            Ledger Items
          </Text>

          <DataTable style={{ alignContent: "center" }}>
            <DataTable.Header>
              <DataTable.Title>Account</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>

            {ledgerItems.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>
                  {getAccountName[item.coa] || `Account ${item.coa}`}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {item.amount?.toFixed(2) || "0.00"}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button mode="outlined" onPress={back} style={styles.button}>
          Back
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          Submit
        </Button>
      </View>
    </ScrollView>
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
  },
  subtitle: {
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  totalLabel: {
    fontWeight: "bold",
  },
  totalValue: {
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 32,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
