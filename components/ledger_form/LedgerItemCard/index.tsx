import { StyleSheet, View } from "react-native";
import { Card, Divider, IconButton } from "react-native-paper";
import AmountField from "../FormFields/AmountField";
import BalanceTypeField from "../FormFields/BalanceTypeField";
import CoaField from "../FormFields/CoaField";

interface LedgerItemCardProps {
  index: number;
  onDelete: () => void;
  showDelete?: boolean;
}

export default function LedgerItemCard({
  index,
  onDelete,
  showDelete = true,
}: LedgerItemCardProps) {
  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <View style={styles.header}>
          <Card.Title title={`Item #${index + 1}`} titleVariant="titleMedium" />
          {showDelete && (
            <IconButton icon="delete" size={20} onPress={onDelete} />
          )}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.fields}>
          <CoaField index={index} />
          <AmountField index={index} />
          <BalanceTypeField index={index} />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  fields: {
    gap: 12,
  },
});
