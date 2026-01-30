import type { LedgerEntry } from "@/types/ledger";
import { formInitialValue, onSubmit } from "@/utils/FormUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useFormContext } from "react-hook-form";

const STORAGE_KEY = "@ledger_form_draft";

interface FormSubmissionContextValue {
  modalOpen: boolean;
  handleModalClose: () => void;
  handleSubmit: (data: LedgerEntry) => Promise<void>;
}

const FormSubmissionContext = createContext<
  FormSubmissionContextValue | undefined
>(undefined);

export function useFormSubmission() {
  const context = useContext(FormSubmissionContext);
  if (!context) {
    throw new Error(
      "useFormSubmission must be used within FormSubmissionProvider",
    );
  }
  return context;
}

interface FormSubmissionProviderProps {
  children: ReactNode;
}

export function FormSubmissionProvider({
  children,
}: FormSubmissionProviderProps) {
  const methods = useFormContext<LedgerEntry>();
  const [modalOpen, setModalOpen] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    const loadDraft = async () => {
      try {
        const draft = await AsyncStorage.getItem(STORAGE_KEY);
        if (draft) {
          const parsed = JSON.parse(draft);
          methods.reset(parsed);
        }
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    };
    loadDraft();
  }, []);

  // Save to AsyncStorage on form changes
  useEffect(() => {
    const subscription = methods.watch((data) => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).catch((error) => {
        console.error("Failed to save draft:", error);
      });
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleSubmit = async (data: LedgerEntry) => {
    try {
      await onSubmit(data);
      setModalOpen(true);
      // Clear draft after successful submission
      await AsyncStorage.removeItem(STORAGE_KEY);
      methods.reset(formInitialValue);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const value = {
    modalOpen,
    handleModalClose,
    handleSubmit,
  };

  return (
    <FormSubmissionContext.Provider value={value}>
      {children}
    </FormSubmissionContext.Provider>
  );
}
