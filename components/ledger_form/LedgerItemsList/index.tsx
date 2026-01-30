import { useFieldArray, useFormContext } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import type { LedgerEntry } from "../../../types/ledger";
import BalanceCheckCard from "../BalanceCheckCard";
import LedgerItemCard from "../LedgerItemCard";

export default function LedgerItemsList() {
  const { control } = useFormContext<LedgerEntry>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ledgerItems",
  });

  const handleAddItem = () => {
    append({ coa: 0, amount: 0, balanceType: "Debit" });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {fields.map((field, index) => (
          <LedgerItemCard
            key={field.id}
            index={index}
            onDelete={() => remove(index)}
            showDelete={fields.length > 2}
          />
        ))}

        <Button
          mode="outlined"
          icon="plus"
          onPress={handleAddItem}
          style={styles.addButton}
        >
          Add Ledger Item
        </Button>

        <BalanceCheckCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  addButton: {
    marginVertical: 12,
  },
});
