import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import type { LedgerEntry } from "../../../types/ledger";

export default function DescriptionField() {
  const { control } = useFormContext<LedgerEntry>();

  return (
    <Controller
      name="description"
      control={control}
      rules={{
        required: "Description is required",
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            label="Description"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!error}
            placeholder="Enter transaction description"
            multiline
            numberOfLines={2}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </View>
      )}
    />
  );
}
