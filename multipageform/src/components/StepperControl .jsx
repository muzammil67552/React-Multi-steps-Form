/* eslint-disable react/prop-types */

const StepperControl = ({handleClick, currentStep, steps}) => {
   

    return (
        <div className="container flex justify-center md:mx-24 gap-3 mb-10   ">
            {/* back button */}
            <button 
                onClick={() => handleClick()}
                className={`btn-primary md:w-52 w-36 md:-mt-12 -mt-16   ${currentStep === 1 ? "cursor-not-allowed" : ""}`}>
                Back
            </button>
            {/* Next button */}
            <button
                onClick={() => handleClick("next")}
                className="btn-primary md:w-52 w-36 md:-mt-12 -mt-16  ">
                {currentStep === steps.length - 1 ? "Confirm" : "Next"}
            </button>           
        </div>
    );
};

export default StepperControl;