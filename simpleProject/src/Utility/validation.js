export const validateNumeric = (value) => /^[0-9]+$/.test(value);

export const handleBlur = (e, setFormErrors) => {
  const { name, value } = e.target;

  // Only validate if there's a value in the field
  if (value) {
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
  } else {
    // Clear the error if the field is empty
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  }
};
