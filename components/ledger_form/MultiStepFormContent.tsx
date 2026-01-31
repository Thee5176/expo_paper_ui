import ProvideBalance from "@/hooks/balance/provider";
import { useFormSubmission } from "@/hooks/form/FormSubmissionContext";
import useStepper from "@/hooks/stepper/useStepper";
import { StyleSheet, View } from "react-native";
import BalanceReview from "./BalanceReview";
import EntryForm from "./EntryForm";
import FormModal from "./FormModal";

/**
 * Display component for the multi-step form
 * Shows progress bar, form steps, and success modal
 */
export default function MultiStepFormContent() {
  const { activeStep } = useStepper();
  const { modalOpen, handleModalClose } = useFormSubmission();

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <EntryForm />;
      case 1:
        return <BalanceReview />;
      default:
        console.log(`Step not found ${activeStep}`);
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* <ProgressBar
        progress={progress}
        color={theme.colors.primary}
        style={styles.progressBar}
      /> */}

      <ProvideBalance>
        <View style={{ flex: 1 }}>{renderStep()}</View>
      </ProvideBalance>

      <FormModal
        open={modalOpen}
        onClose={handleModalClose}
        message="Ledger entry submitted successfully!"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    height: 4,
  },
});
