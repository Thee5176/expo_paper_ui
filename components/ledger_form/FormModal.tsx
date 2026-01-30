import { Button, Dialog, Portal, Text } from "react-native-paper";

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export default function FormModal({
  open,
  onClose,
  message = "Success!",
}: FormModalProps) {
  return (
    <Portal>
      <Dialog visible={open} onDismiss={onClose}>
        <Dialog.Title>Submission Complete</Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
