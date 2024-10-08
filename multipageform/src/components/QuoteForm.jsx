import { useState } from "react";
import Stepper from "./Stepper";
import StepperContext from "./contexts/StepperContext";
import StepperControl from "./StepperControl ";
import Business from "./steps/Business";
import Details from "./steps/Details";
import Final from "./steps/Final";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QuoteForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        businessCategory: "",
        numberOfOwners: "",
        spaceType: "",
        residenceVisas: "",
        name: "",
        email: "",
        contactNumber: "",
        nationality: "",
        city: "",
        startBusiness: "",
    });
    const [finalData, setFinalData] = useState([]);

    const steps = ["Business Information", "Personal Details", "Complete"];

    const validateStep = () => {
        if (currentStep === 1) {
            if (!userData.businessCategory || !userData.numberOfOwners || !userData.spaceType || !userData.residenceVisas) {
                toast.error("Please fill out all business information fields!");
                return false;
            }
        } else if (currentStep === 2) {
            if (!userData.name || !userData.email || !userData.contactNumber || !userData.nationality || !userData.city || !userData.startBusiness) {
                toast.error("Please fill out all personal details!");
                return false;
            }
        }
        return true;
    };

    const handleClick = (direction) => {
        let newStep = currentStep;

        if (direction === "next") {
            if (!validateStep()) {
                return; // Prevent going to the next step if validation fails
            }
            newStep++;
        } else {
            newStep--;
        }

        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };

    const displaySteps = (step) => {
        switch (step) {
            case 1:
                return <Business />;
            case 2:
                return <Details />;
            case 3:
                return <Final />;
            default:
                return null;
        }
    };

    return (
        <>
            

            <div className="flex justify-center md:mt-32 mt-16 ">
                <div>
                    <h1 className="md:text-5xl font-semibold text-3xl text-center mt-8 ">React Multi Step Form</h1>
                    <h2 className="md:text-3xl font-medium text-2xl text-center mt-3">Calculate Cost</h2>
                    <p className="md:text-2xl text-red-700 text-xl text-center mt-3">Please Fill Up The Below Requirements</p>
                </div>
            </div>

            <div className="md:mt-16 mt-8 ">
                <div className="mx-auto shadow-md rounded-2xl pb-8 bg-gray-50 mt-10">
                    <div className="container horizontal mt-5 justify-center mx-auto md:px-64">
                        <Stepper steps={steps} currentStep={currentStep} />
                        <div className="my-10 p-10 mx-auto">
                            <StepperContext.Provider value={{ userData, setUserData, finalData, setFinalData }}>
                                {displaySteps(currentStep)}
                            </StepperContext.Provider>
                        </div>
                    </div>
                    <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps} />
                </div>
            </div>
          

            <ToastContainer position="top-right mt-36" autoClose={5000} hideProgressBar={false} />
        </>
    );
}

export default QuoteForm;