/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newSteps.length) {
      if (count < stepNumber) {
        newSteps[count] = { ...newSteps[count], highlighted: false, selected: true, completed: true };
      } else if (count === stepNumber) {
        newSteps[count] = { ...newSteps[count], highlighted: true, selected: true, completed: true };
      } else {
        newSteps[count] = { ...newSteps[count], highlighted: false, selected: false, completed: false };
      }
      count++;
    }
    return newSteps;
  };

  useEffect(() => {
    // Create object for steps
    const stepsState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));

    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => (
    <div
      key={index}
      className={`${
        index !== newStep.length - 1 ? "w-full flex items-center" : "items-center"
      }`}
    >
      <div className="relative flex flex-col items-center text-teal-600">
        <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center ${step.selected ? "bg-green-600 text-white font-bold border border-green-600" : ""}`}>
          {step.completed ? (
            <span className=" font-bold text-xl">✓</span>
          ) : (
            index + 1
          )}
        </div>
        
        <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${step.highlighted ? "text-gray-900" : "text-gray-400"}`}>
          {step.description}
        </div>
      </div>

      {index !== newStep.length - 1 && (
        <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.completed ? "border-green-600" : "border-gray-300"}`} />
      )}
    </div>
  ));

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;