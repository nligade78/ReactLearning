export const handleTransactionTypeChange = (setFormData) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      header: { ...prevData.header, ticketType: event.target.value },
    }));
  };
  
  export const handleChange = (setFormData) => (event) => {
    const { name, value } = event.target;
    const [field, subField] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [field]: { ...prevData[field], [subField]: value },
    }));
  };
  
  export const handleSubmit = (formData) => (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
  };
  
  export const handleClear = (setFormData, setFormErrors) => () => {
    setFormData({
      header: { ticketType: "" },
      profile: { masterProvID: "", lob: "", abc: "" },
      description: [],
      
    });
    setFormErrors({});
  };
  
  export const toggleDrawer = (setIsDrawerOpen) => () => {
    setIsDrawerOpen((prevOpen) => !prevOpen);
  };
  