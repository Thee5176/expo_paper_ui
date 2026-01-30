import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import type { LedgerEntry } from "../../../types/ledger";

interface AmountFieldProps {
  index: number;
}

export default function AmountField({ index }: AmountFieldProps) {
  const { control } = useFormContext<LedgerEntry>();

  return (
    <Controller
      name={`ledgerItems.${index}.amount`}
      control={control}
      rules={{
        required: "Amount is required",
        min: { value: 0, message: "Amount must be positive" },
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            label="Amount"
            mode="outlined"
            value={value?.toString() ?? ""}
            onChangeText={(text) => {
              const numValue = parseFloat(text);
              onChange(isNaN(numValue) ? 0 : numValue);
            }}
            onBlur={onBlur}
            error={!!error}
            keyboardType="decimal-pad"
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </View>
      )}
    />
  );
}
