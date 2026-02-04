'use client';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
  totalSteps?: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps = 3,
}: StepIndicatorProps) {
  const steps = [
    { number: 1, label: 'Event Type' },
    { number: 2, label: 'Budget' },
    { number: 3, label: 'Build Order' },
  ];

  return (
    <div className="flex items-center justify-center mb-8 sm:mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step circle */}
          <div className="flex flex-col items-center">
            <div
              className={`
                w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                font-bold text-sm sm:text-base transition-all duration-300
                ${
                  currentStep > step.number
                    ? 'bg-success-green text-white'
                    : currentStep === step.number
                    ? 'bg-primary-brown text-white ring-4 ring-primary-brown/20'
                    : 'bg-light-brown/20 text-light-brown'
                }
              `}
            >
              {currentStep > step.number ? (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`
                mt-2 text-xs sm:text-sm font-medium hidden sm:block
                ${
                  currentStep >= step.number
                    ? 'text-primary-brown'
                    : 'text-light-brown'
                }
              `}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`
                w-12 sm:w-20 h-1 mx-2 sm:mx-4 rounded-full transition-all duration-300
                ${
                  currentStep > step.number
                    ? 'bg-success-green'
                    : 'bg-light-brown/20'
                }
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}
