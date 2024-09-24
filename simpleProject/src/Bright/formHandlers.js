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

  export const handleMultiSelectChange =(setFormData) => (event)  =>{
    const{name,value}=event.target;
    setFormData((prevData) =>{
      const newState={...prevData};
      let current = newState;
      const keys=name.split('.');
      keys.forEach((key,index) =>{
        if(index === keys.length-1)
        {
          current[key] = typeof value === 'string'? value.split(','):value;
        }
        else{
          current = current[key];
        }
      });
      return newState;
    })

  }

    export const handleSubmit = (e, formData) => {
    e.preventDefault(); // Prevent form default behavior
    console.log("Form submitted:", formData); // Log the formData
  };
  
  export const handleClear = (setFormData, setFormErrors) => () => {
    setFormData({
      header: { ticketType: "", originalDetails: { LOB: [] } },  // Reset LOB field
      profile: { masterProvID: "", lob: "", abc: "" },
      description: [],
    });
    setFormErrors({});
  };
  
  
  export const toggleDrawer = (setIsDrawerOpen) => () => {
    setIsDrawerOpen((prevOpen) => !prevOpen);
  };
  