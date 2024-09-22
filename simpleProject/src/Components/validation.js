// validation.js
export const validateNumeric = (value) => /^[0-9]+$/.test(value);

export const handleBlur = (e, setFormErrors) => {
  const { name, value } = e.target;

  const fieldsRequiringNumericValidation = ['profile.masterProvID', 'profile.lob'];
  if (fieldsRequiringNumericValidation.includes(name)) {
    if (!validateNumeric(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Only numeric values are allowed',
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  }
};
