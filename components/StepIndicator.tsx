import { Button } from "@/components/ui/button";

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  onStepChange,
}: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step) => (
        <Button
          key={step.id}
          variant={currentStep === step.id ? "default" : "outline"}
          className="flex-1 mx-1"
          onClick={() => onStepChange(step.id)}
        >
          {step.title}
        </Button>
      ))}
    </div>
  );
}
