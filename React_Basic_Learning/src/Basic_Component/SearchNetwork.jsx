import React, { useState } from 'react'

const SearchNetwork =()=>{
  const[formData,setFormData]=useState(add_linkage);
  const[networkData,setNetwrokData]=useState([]);
  const[confidenceData,setConfidenceData]=useState({});
  const[confidenceScoreEnabled,setConfidenceScoreEnabled]=useState(false);
  const[clearEnabled,setClearEnabled]=useState(false);
  const[isSubmitted,setIsSubmitted]=useState(false);
  const[responseMessage,setResponseMessage]=useState(false);
  const[open,setOpen]=useState(false);
  const[openTable,setOpenTable]=useState(false);
  const[loading,setLoading]=useState(false);
  const[showMainTable,setShowMainTable]=useState(false);
  const[collapseOpen,setCollapseOpen]=useState(false);

  const apiRef=useGridApiRef();
  
  // Simple fetch api to get data from endpoint api

  
}