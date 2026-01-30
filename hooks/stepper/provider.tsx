import type { ReactNode } from "react";
import useProvideStepper from ".";
import { StepperContext } from "./context";

export function ProvideStepper({ children }: { children: ReactNode }) {
  const stepper = useProvideStepper({ total: 2, initialStep: 0 });

  return (
    <StepperContext.Provider value={stepper}>
      {children}
    </StepperContext.Provider>
  );
}
