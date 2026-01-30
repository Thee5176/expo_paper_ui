import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { HelperText, Menu, TextInput } from "react-native-paper";
import { useCoa } from "../../../hooks/coa/useCoa";
import type { LedgerEntry } from "../../../types/ledger";

interface CoaFieldProps {
  index: number;
}

export default function CoaField({ index }: CoaFieldProps) {
  const { control } = useFormContext<LedgerEntry>();
  const { codeOfAccounts, getAccountName } = useCoa();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Controller
      name={`ledgerItems.${index}.coa`}
      control={control}
      rules={{ required: "Account is required" }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedAccount = getAccountName[value] || "";

        return (
          <View style={styles.container}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Pressable onPress={() => setMenuVisible(true)}>
                  <View pointerEvents="none">
                    <TextInput
                      label="Chart of Account"
                      mode="outlined"
                      value={selectedAccount}
                      error={!!error}
                      editable={false}
                      right={
                        <TextInput.Icon
                          icon={menuVisible ? "chevron-up" : "chevron-down"}
                        />
                      }
                    />
                  </View>
                </Pressable>
              }
              contentStyle={styles.menuContent}
            >
              {codeOfAccounts.map(
                (account: { code: number; title: string }) => (
                  <Menu.Item
                    key={account.code}
                    onPress={() => {
                      onChange(account.code);
                      setMenuVisible(false);
                    }}
                    title={`${account.code} - ${account.title}`}
                  />
                ),
              )}
            </Menu>
            {error && <HelperText type="error">{error.message}</HelperText>}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  menuContent: {
    maxHeight: 300,
  },
});
