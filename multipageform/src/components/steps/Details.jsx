import { useContext, useState } from "react";
import StepperContext from "../contexts/StepperContext";
import countryCodes from "../data/countryCodes";
import nationalities from "../data/nationalities"; // Importing the nationalities

const Details = () => {
  const { userData, setUserData } = useContext(StepperContext);

  // Local state for form errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contactNumber: '',
    nationality: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Validate fields on change
    validateField(name, value);
  };

  // Field-level validation
  const validateField = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'name':
        if (!value) {
          errorMessage = 'Please enter your name.';
        } 
        break;
      case 'email':
        { const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = 'Please enter your email.';
        } else if (!emailPattern.test(value)) {
          errorMessage = 'Please enter a valid email address.';
        }
        break; }
      case 'contactNumber':
        { const countryCode = userData.countryCode || '';
        if (!value) {
          errorMessage = 'Please enter your contact number.';
        } else if (!/^\d{7,14}$/.test(value)) {
          errorMessage = 'Please enter a valid contact number without the country code.';
        } else if (countryCode && value.length < 7) {
          errorMessage = 'Please enter a complete contact number.';
        }
        break; }
      case 'nationality':
        if (!value) {
          errorMessage = 'Please select your nationality.';
        }
        break;
      case 'city':
        if (!value) {
          errorMessage = 'Please select a city.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  return (
    <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

      {/* Name */}
      <label className="mb-2 font-semibold">Name</label>
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        className={`mb-4 border rounded-lg p-2 ${errors.name ? 'border-red-500' : ''}`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      {/* Email */}
      <label className="mb-2 font-semibold">Email</label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className={`mb-4 border rounded-lg p-2 ${errors.email ? 'border-red-500' : ''}`}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      {/* Contact Number */}
      <label className="mb-2 font-semibold">Contact Number</label>
      <div className="flex mb-4">
        <select
          name="countryCode"
          onChange={handleChange}
          className="mr-2 border rounded-lg py-2"
          value={userData.countryCode}
          style={{ maxHeight: '150px', overflowY: 'auto' }}
        >
          <option value="">code</option>
          {countryCodes.map(({ code, codeThreeLetters }) => (
            <option key={code} value={code}>
              {code} - {codeThreeLetters}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="contactNumber"
          value={userData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          className={`border rounded-lg  ${errors.contactNumber ? 'border-red-500' : ''}`}
        />
      </div>
      {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}

      {/* Nationality */}
      <label className="mb-2 font-semibold">Nationality</label>
      <select
        name="nationality"
        value={userData.nationality}
        onChange={handleChange}
        className={`mb-4 border rounded-lg p-2 ${errors.nationality ? 'border-red-500' : ''}`}
      >
        <option value="">Select your nationality</option>
        {nationalities.map((nationality) => (
          <option key={nationality} value={nationality}>
            {nationality}
          </option>
        ))}
      </select>
      {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}

      {/* City */}
      <label className="mb-2 font-semibold">Want To Setup a Company in</label>
      <select
        name="city"
        value={userData.city}
        onChange={handleChange}
        className={`mb-4 border rounded-lg p-2 ${errors.city ? 'border-red-500' : ''}`}
      >
        <option value="">Select a city</option>
        <option value="Muscat">Muscat</option>
        <option value="Salalah">Salalah</option>
        <option value="Sohar">Sohar</option>
        <option value="Nizwa">Nizwa</option>
        <option value="Sur">Sur</option>
        {/* Add more cities as needed */}
      </select>
      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

      {/* Start Business */}
      <label className="mb-2 font-semibold">When Will You Start the Business?</label>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="startBusiness"
            value="1 Week"
            checked={userData.startBusiness === "1 Week"}
            onChange={handleChange}
            className="mr-2"
          />
          1 Week
        </label>
        <label>
          <input
            type="radio"
            name="startBusiness"
            value="More than 1 Week"
            checked={userData.startBusiness === "More than 1 Week"}
            onChange={handleChange}
            className="mr-2"
          />
          More than 1 Week
        </label>
      </div>
    </div>
  );
};

export default Details;