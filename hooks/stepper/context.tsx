import { createContext } from "react";
import type useProvideStepper from ".";

export const StepperContext = createContext<ReturnType<
  typeof useProvideStepper
> | null>(null);
