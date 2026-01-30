import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { HelperText, SegmentedButtons } from "react-native-paper";
import type { LedgerEntry } from "../../../types/ledger";

interface BalanceTypeFieldProps {
  index: number;
}

export default function BalanceTypeField({ index }: BalanceTypeFieldProps) {
  const { control } = useFormContext<LedgerEntry>();

  return (
    <Controller
      name={`ledgerItems.${index}.balanceType`}
      control={control}
      rules={{ required: "Balance type is required" }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <SegmentedButtons
            value={value}
            onValueChange={onChange}
            buttons={[
              { value: "Debit", label: "Debit" },
              { value: "Credit", label: "Credit" },
            ]}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
});
