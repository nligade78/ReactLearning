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
  

  -----------


  ----

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
    // ... rest of your  ...
    
  );
  
Steps for Refactoring API Calls:
Move API Call to a Separate Module

Extract the API call logic (e.g., getNetworks()) from the component and move it to a new file (e.g., apiHandlers.js).
Import the API Function into the Component

Import the refactored API function into the component where it is needed (e.g., import { getNetworks } from './apiHandlers';).
Trigger API Call in the Component

Ensure the API call is triggered from the original component by calling the function when necessary (e.g., on button click or form submit).
Handle API Response in the Component

Process the API response within the component (e.g., update state or pass the data to other functions).
Ensure Error Handling

Verify that error handling is properly implemented in the refactored API function and that it gracefully handles errors in the component.
