// apiCalls.js

// Fetch networks based on form data
export const getNetworks = async (formData, url) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
  
    try {
      const result = await fetch(url, requestOptions);
      const data = await result.json();
  
      if (
        data &&
        data.providerAddress[0].address.dataQulityInsights[0].statusDescription
      ) {
        return {
          responseMessage: data.providerAddress[0].address.dataQulityInsights[0].statusDescription,
          success: true
        };
      } else {
        const info = data.providerAddress[0].addressAdditionalDetails;
        return { data, info, success: true };
      }
    } catch (error) {
      console.error("Error Fetching data", error);
      return { error, success: false };
    }
  };
  
  // Fetch master provider data using masterProvID
  export const fetchMasterProvData = async (value, url) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ masterProvID: value }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      console.error("Error Fetching master provider data:", error);
      return { error, success: false };
    }
  };
  

  export const handleClear = (
    setFormData, 
    add_linkage, 
    setNetworkData, 
    setIsSubmitted, 
    setConfidenceScoreEnable, 
    setClearEnabled, 
    apiRef, 
    setShowCheckBox, 
    setShowContractedState, 
    setIsContractStateEnabled, 
    setFormErrors, 
    setLobLabel
  ) => {
    setFormData(add_linkage); // Reset form data
    setNetworkData([]); // Clear data sent to NetworkTable
    setIsSubmitted(false);
    add_linkage.profile.masterProvID = "";
    setConfidenceScoreEnable(false);
    setClearEnabled(false);
    apiRef.current.setFilterModel({ items: [] });
    setShowCheckBox(false);
    setShowContractedState(false);
    setIsContractStateEnabled(false);
    setFormErrors({});
    setLobLabel({
      masterProvIDLabel: "Org ID"
    });
  };
  
  
  // Inside your component
  import { handleClear } from './networkHandlers'; // Ensure the correct path
  
  // ... inside your component function
  return (
    // ... your JSX
    <button
      onClick={() =>
        handleClear({
          setFormData,
          add_linkage,
          setNetworkData,
          setIsSubmitted,
          setConfidenceScoreEnable,
          setClearEnabled,
          apiRef,
          setShowCheckBox,
          setShowContractedState,
          setIsContractStateEnabled,
          setFormErrors,
          setLobLabel,
        })
      }
    >
      Clear
    </button>
    // ... rest of your JSX
  );
  