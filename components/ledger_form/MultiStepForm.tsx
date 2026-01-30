import { FormSubmissionProvider } from "@/hooks/form/FormSubmissionContext";
import { ProvideStepper } from "@/hooks/stepper/provider";
import type { LedgerEntry } from "@/types/ledger";
import { formInitialValue } from "@/utils/FormUtils";
import { FormProvider, useForm } from "react-hook-form";
import MultiStepFormContent from "./MultiStepFormContent";

/**
 * Setup component for multi-step form
 * Provides form context, stepper context, and submission logic
 */
export default function MultiStepForm() {
  const methods = useForm<LedgerEntry>({
    defaultValues: formInitialValue,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <FormSubmissionProvider>
        <ProvideStepper>
          <MultiStepFormContent />
        </ProvideStepper>
      </FormSubmissionProvider>
    </FormProvider>
  );
}
