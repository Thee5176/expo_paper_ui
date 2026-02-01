import { useMemo, useState } from "react";

export default function useProvideStepper({
  total = 2,
  initialStep = 0,
}: {
  total: number;
  initialStep?: number;
}) {
  const [activeStep, setActiveStep] = useState(initialStep);

  const value = useMemo(
    () => ({
      activeStep,
      setActiveStep,
      next: () => setActiveStep((s) => Math.min(s + 1, total - 1)),
      back: () => setActiveStep((s) => Math.max(s - 1, 0)),
      reset: () => setActiveStep(0),
      total,
    }),
    [activeStep, total],
  );

  return {
    activeStep,
    setActiveStep,
    next: value.next,
    back: value.back,
    reset: value.reset,
    total,
  };
}
