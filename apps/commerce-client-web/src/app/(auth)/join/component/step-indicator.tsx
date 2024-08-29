interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="relative mb-8 flex items-center justify-between">
      <div className="absolute inset-x-0 top-2.5 h-px bg-slate-200"></div>
      {steps.map((label, index) => (
        <div
          key={index}
          className="relative flex cursor-pointer flex-col items-center"
          onClick={() => onStepClick(index)}
        >
          <div
            className={`size-5 rounded-full ${
              currentStep === index ? 'bg-primary' : 'bg-gray-300'
            } flex items-center justify-center text-xs text-white`}
          >
            {index + 1}
          </div>
          <span
            className={`mt-2 text-sm ${currentStep === index ? 'text-primary' : 'text-slate-400'}`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
