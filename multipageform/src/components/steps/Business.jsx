import { useContext, useState } from "react";
import StepperContext from "../contexts/StepperContext";

const Business = () => {
  const { userData, setUserData } = useContext(StepperContext);

  // Local state for form errors
  const [errors, setErrors] = useState({
    businessCategory: '',
    numberOfOwners: '',
    spaceType: '',
    residenceVisas: '',
  });

  // Handle change and validate fields on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Clear the error message for the field once it's valid
    validateField(name, value);
  };

  // Field-level validation
  const validateField = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'businessCategory':
        if (!value) {
          errorMessage = 'Please select a business category.';
        }
        break;
      case 'numberOfOwners':
        if (!value) {
          errorMessage = 'Please enter the number of owners.';
        } else if (isNaN(value) || value <= 0) {
          errorMessage = 'Please enter a valid positive number.';
        }
        break;
      case 'spaceType':
        if (!value) {
          errorMessage = 'Please specify the type of space needed.';
        }
        break;
      case 'residenceVisas':
        if (!value || isNaN(value) || value <= 0) {
          errorMessage = 'Please enter a valid number of residence visas.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  return (
    <div className="flex flex-col p-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600">
      <h2 className="text-2xl font-bold mb-4">Business Information</h2>

      {/* Business Category */}
      <label className="mb-2 font-semibold">Select Business Category</label>
      <select
        name="businessCategory"
        onChange={handleChange}
        value={userData.businessCategory}
        className={`mb-4 border rounded-lg p-2 ${errors.businessCategory ? 'border-red-500' : ''}`}
      >
        <option value="">Select a category</option>
        <option value="restaurant">Restaurant</option>
        <option value="retail">Retail</option>
        <option value="service">Service</option>
        <option value="consulting">Consulting</option>
      </select>
      {errors.businessCategory && <p className="text-red-500 text-sm">{errors.businessCategory}</p>}

      {/* Number of Owners - Changed to text input */}
      <label className="mb-2 font-semibold">Number of Owners</label>
      <input
        type="text" // Changed from select to text input
        name="numberOfOwners"
        onChange={handleChange}
        value={userData.numberOfOwners}
        placeholder="Enter number of owners"
        className={`mb-4 border rounded-lg p-2 ${errors.numberOfOwners ? 'border-red-500' : ''}`}
      />
      {errors.numberOfOwners && <p className="text-red-500 text-sm">{errors.numberOfOwners}</p>}

      {/* Type of Space Needed */}
      <label className="mb-2 font-semibold">Type of Space Needed (for Restaurant)</label>
      <select
        name="spaceType"
        onChange={handleChange}
        value={userData.spaceType}
        className={`mb-4 border rounded-lg p-2 ${errors.spaceType ? 'border-red-500' : ''}`}
      >
        <option value="">Select type of space</option>
        <option value="indoor">Indoor</option>
        <option value="outdoor">Outdoor</option>
        <option value="mixed">Mixed</option>
      </select>
      {errors.spaceType && <p className="text-red-500 text-sm">{errors.spaceType}</p>}

      {/* Number of Residence Visas */}
      <label className="mb-2 font-semibold">Number of Residence Visas Needed</label>
      <input
        type="number"
        name="residenceVisas"
        onChange={handleChange}
        value={userData.residenceVisas}
        placeholder="Enter number of visas"
        className={`mb-4 border rounded-lg p-2 ${errors.residenceVisas ? 'border-red-500' : ''}`}
      />
      {errors.residenceVisas && <p className="text-red-500 text-sm">{errors.residenceVisas}</p>}
    </div>
  );
};

export default Business;