interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="relative flex items-center justify-between mb-8">
      <div className="absolute top-2.5 left-0 right-0 h-[1px] bg-slate-200"></div>
      {steps.map((label, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center cursor-pointer"
          onClick={() => onStepClick(index)}
        >
          <div
            className={`w-5 h-5 rounded-full ${
              currentStep === index ? 'bg-primary' : 'bg-gray-300'
            } flex items-center justify-center text-white text-xs`}
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
