import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import type { LedgerEntry } from "../../../types/ledger";

export default function DateField() {
  const { control } = useFormContext<LedgerEntry>();

  return (
    <Controller
      name="date"
      control={control}
      rules={{
        required: "Date is required",
        pattern: {
          value: /^\d{4}-\d{2}-\d{2}$/,
          message: "Date must be in YYYY-MM-DD format",
        },
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            label="Date"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!error}
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </View>
      )}
    />
  );
}
