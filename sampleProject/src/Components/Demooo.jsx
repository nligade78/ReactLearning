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
  