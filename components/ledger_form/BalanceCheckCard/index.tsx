import { StyleSheet, View } from "react-native";
import { Card, List, useTheme } from "react-native-paper";
import { useBalance } from "../../../hooks/balance/useBalance";

export default function BalanceCheckCard() {
  const { debitTotal, creditTotal, diff, isBalanced } = useBalance();
  const theme = useTheme();

  const statusColor = isBalanced ? theme.colors.primary : theme.colors.error;
  const statusIcon = isBalanced ? "check-circle" : "alert-circle";
  const statusText = isBalanced ? "Balanced" : "Not Balanced";

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <Card.Title title="Balance Check" titleVariant="titleMedium" />

        <List.Section>
          <List.Item
            title="Debit Total"
            description={debitTotal.toFixed(2)}
            left={(props) => <List.Icon {...props} icon="plus-circle" />}
          />
          <List.Item
            title="Credit Total"
            description={creditTotal.toFixed(2)}
            left={(props) => <List.Icon {...props} icon="minus-circle" />}
          />
          <List.Item
            title="Difference"
            description={diff.toFixed(2)}
            left={(props) => <List.Icon {...props} icon="calculate" />}
          />
        </List.Section>

        <View
          style={[
            styles.statusContainer,
            { backgroundColor: statusColor + "20" },
          ]}
        >
          <List.Item
            title={statusText}
            titleStyle={{ color: statusColor, fontWeight: "bold" }}
            left={(props) => (
              <List.Icon {...props} icon={statusIcon} color={statusColor} />
            )}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
  },
  statusContainer: {
    marginTop: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
});
