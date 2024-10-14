import React, { useState, useEffect, useContext } from 'react';
import { add_linkage } from '../InputPayload/add_linkage';
import SelectComponent from '../InputesFields/SelectComponent';
import TextFieldComponent from '../InputesFields/TextFieldComponent';
import { transactionTypeOptions } from '../Constants/Constants';
import NetworkTable from '../Table/NetworkTable';
import { useGridApiRef } from '@mui/x-data-grid';
import { AuthContext } from '../Hooks/AuthProvider';
import { Box } from '@mui/system';
import { Backdrop, Button, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';

const SearchNetwork = () => {
  const [formData, setFormData] = useState(add_linkage); // Initial form data
  const [networkData,setNetworkData]=useState([]);
  const [confidencedata,setConfidenceData]=useState({});
  const [confidenceScoreEnable,setConfidenceScoreEnable]=useState(false);
  const [clearEnabled,setClearEnabled]=useState(false);
  const [isSubmitted,setIsSubmitted]=useState(false);
  const [responseMessage,setResponseMessage]=useState('');
  const [open,setOpen]=useState(false);
  const [openTable,setOpenTable]=useState(false);
  const [loading, setLoading] = useState(false);
  const [showMainTable, setShowMainTable] = useState(true);
  const [collapseOpen,setCollapseOpen]=useState(false);
  const [descriptionOptions, setDescriptionOptions] = useState([]);
  const [showCheckBox,setShowCheckBox]=useState(false);
  const [showContractedState,setShowContractedState]=useState(false);
  const [isContractedStsteEnable,setIsContractStateEnabled]=useState(false);
  const [isDialogOpen,setIsDialogOpen]=useState(false);
  const [formErrors, setFormErrors] = useState({}); 
  const [labels,setLobLabel]=useState({
    masterProvID:"Master ProvID Label"
  })

  const apiRef =useGridApiRef();
  const {user}=useContext(AuthContext);

  const isUpdateLinkage=formData.header.ticketType === 'UpdateLinkage';
  const isAddAddress=formData.header.ticketType === 'AddOrgLocation';


  // Simple fetch api to get data from endpoint
  const getNetworks = async (formData, url) => {
    const requestOptions = {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    try {
      const result = await fetch(url, requestOptions);
      const data = await result.json();
      if (
        data &&
        data.providerAddress[0].address.dataQulityInsights[0].statusDescription
      ) {
        setResponseMessage(
          data.providerAddress[0].address.dataQulityInsights[0]
            .statusDescription
        );
        setOpen(true);
      } else {
        const info = data.providerAddress[0].addressAdditionalDetails;
        return { dara, info };
      }
    } catch {
      console.error("Error Fetching data", error);
    }
    finally{
      setLoading(false);
    }
  };
  
  const handleClickOpenTableDialog = ()=>{
    setOpenTable(true);
  }

  const handleCloseTableDialog =() =>{
    setOpenTable(false);
  }


  // Handle transaction type change
  const handleTransactionTypeChange = (e) => {
    handleClear()
    const { value } = e.target;
    setClearEnabled(true);
    const newFormdata = value === 'Add-OrgLocation' ? add_address: add_linkage;
    setFormData((prevState) => ({

      ...newFormdata,

      header: {
        ...prevState.header,
        ticketType: value,
      },
    }));

    // Change label based on the selected transaction type
    if (value === 'Add Address') {
     setLobLabel({
      masterProvIDLabel:"Org ID"
     })
      setData([]); // Clear data for 'Add Address'
    } else {
      setLobLabel({
        masterProvIDLabel:"Org ID"
       })
    }
  };

// Handle input field changes
const handleChange = async (e) => {
  const { name, value } = e.target;
  setFormData((prevState) => {
    const newState = { ...prevState };
    if (name === "providerAddress.0.address.keyData.state") {
      newState.providerAddress[0].address.keyData.state = value;
      newState.header.originalDetails.contractState = value;
    } else {
      const keys = name.split(".");
      let current = newState;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          current = current[key];
        }
      });
    }
    return newState;
  });

  if(name === 'providerAddress.0.address.keyData.state')
  {
    setShowCheckBox(value.trim().length > 0);
    const url ='';
  }
  // Check if we're updating the masterProvID field and transaction type is "Update Linkage"
  if(form.header.ticketType === 'UpdateLinkage')
  {
    if (name === 'profile.masterProvID' && value &&formData.header.ticketType !== 'AddOrgLocation') {
      if (validateNumeric(value)) {
        // If masterProvID is valid (numeric), fetch data
        setLoading(true);
        try {
          const response = await fetch(url,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body: JSON.stringify({masterProvID:value})
          });
          const data = await response.json();

          const options=data.map(item => ({
            value : `${item.SPCLTY_CD}`,
            label:`${item.SPCLTY_CD}`
          }));
              setDescriptionOptions(options);

              const firstPrimarySpecialty = data.find(item => item.PRIMARY_SPCLTY_IND === 'Y');
              if (firstPrimarySpecialty) {
                setFormData((prevState) => ({
                  ...prevState,
                  profile: {
                    ...prevState.profile,
                    npi: firstPrimarySpecialty.NPI, // Set NPI for primary specialty
                  },
                }));
              }
              else {
                // No primary specialty found, clear NPI
                setFormData((prevState) => ({
                  ...prevState,
                  profile: {
                    ...prevState.profile,
                    npi: '', // Clear NPI if no primary specialty is found
                  },
                }));
              }
            }
            catch (error)
            {
              console.error('Error fetching data:', error);
              setDescriptionOptions([]);
            }finally{
              setLoading(false);
            }
          }
          else{
            console.log("Not valid Number");
          }
        }
  }
}

const getSelectedDescriptionLabels = () => {  
  const selectedIds = formData.profile.keyData.taxonomyCd || [];
  const selectedOptions = descriptionOptions.filter((option) => 
    selectedIds.includes(option.value.split('-')[0])
  );
  return selectedOptions.map((option) => option.value);
};

const handleMultiSelectChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevState) => {
    const newState = { ...prevState };
    const keys = name.split('.');
    let current = newState;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        current = current[key];
      }
    });
    return newState;
  });
  setIsSubmitted(true); 
};

const handleCheckboxChange = (e) => {
  const isChecked = e.target.checked;
  setShowContractedState(isChecked);
  setIsContractStateEnabled(isChecked); 
};

const handleSubmit = (e) => {
  e.preventDefault();
  apiRef.current.setFilterModel({items:[]})
  if(isAddAddress && (!formData.profile.masterProvID && !formData.profile.keyData.taxID)){
    setIsDialogOpen(true);
    return;
  }

  const url="";

  //Generate transaction ID
  const updatedForm={
    ...formData,
    header:{
      ...formData.header,
      transactionID:uuidv4(),
      originalDetails:{
        ...formData.header.originalDetails,
        requestors:[
          {
            firstname:'',
            lastname:'',
            email:''
          }
        ]
      }
    }
  };

  setLoading(true);
  getNetworks(updatedForm,url).then((data)=>{
    try{
      setFormData((prevState) => ({
        ...prevState,
        header:{
          ...prevState.header,
          transactionID:data.header.transactionID,
        }
      }))
      setNetworkData(data.data);
      setConfidenceData(data.info);
      setConfidenceScoreEnable(true);
    }
    catch (error){
      console.log('Error Submitting Form:',error);
    }
  })
  // Handle submit logic
};

const handleCloseDialog =()=>{
  setIsDialogOpen(false);
}


// Handle clearing form and table data
const handleClear = () => {
  setFormData(add_linkage); // Reset form data
  networkData([]); // Clear data sent to NetworkTable
  setIsSubmitted(false); 
  add_linkage.profile.masterProvID="";
  setConfidenceScoreEnable(false);
  setClearEnabled(false);
  apiRef.current.setFilterModel({items:[]})
  setShowCheckBox(false);
  setShowContractedState(false);
  setIsContractStateEnabled(false);
  setFormErrors({});
  setLobLabel({
    masterProvIDLabel:"Org ID"
   })
};

const handleClose =()=>{
  setOpen(false);
}

const toggleTable = ()=>{
  setShowMainTable(!showMainTable)
}

const fieldConfiguration={
  "AddOrgLocation":{
    disableFields:['Address ID']
  },
  "UpdateLinkage":{
    disableFields:["ZIp Code"]
  }
}

isFieldDisabled =( fieldName) =>{
  const {ticketType} =formData.header;
  if(!ticketType) return false;
  const config = fieldConfiguration[ticketType];
  return config.disableFields.includes(fieldName);
}

const toggleCollapse =()=>{
  setCollapseOpen(!collapseOpen);
}


// Function to get selected description labels

  return (
    <div>
      <div>
        <header>Search Network</header>
        <span>Environment :{''}</span>
      </div>
      <form onSubmit={handleSubmit}>

        <div className='checkBox'>
          <div className='che'>
            {showCheckBox &&(
              <div>
                <label>
                  <input type="checkbox"
                  name="marketCheckbox"
                  checked={isContractedStsteEnable}
                  onChange={handleCheckboxChange} />
                </label>
                :Enable State
              </div>
            )}
          </div>
        </div>
        <SelectComponent
          label="Transaction type"
          name="transactionType"
          value={formData.header.ticketType || ''}
          onChange={handleTransactionTypeChange}
          options={transactionTypeOptions}
        />

        <TextFieldComponent
          label={masterProvIDLabel} // Use dynamic label
          name="profile.masterProvID"
          value={formData.profile.masterProvID || ''}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e, setFormErrors)} // Validate on blur
          error={!!formErrors['profile.masterProvID']} // Pass error state
          helperText={formErrors['profile.masterProvID']} // Show error message
        />

        <TextFieldComponent
          label={lobLabel}
          name="profile.lob"
          value={formData.profile.lob || ''}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e, setFormErrors)} // Validate on blur
          error={!!formErrors['profile.lob']} // Pass error state
          helperText={formErrors['profile.lob']} // Show error message
        />

        <TextFieldComponent
          label="Market"
          name="profile.market"
          value={formData.profile.market || ''}
          onChange={handleChange}
        />

        <SelectComponent
          label="Description"
          name="description"
          value={getSelectedDescriptionLabels()}
          onChange={handleChange}
          options={descriptionOptions}
          disabled={!descriptionOptions.length}
        />

        <TextFieldComponent
          label="NPI"
          name="profile.npi"
          value={formData.profile.npi || ''}
          onChange={handleChange}
          disabled={loading} // Disable the NPI field while loading
        />
        {showContractedState && (
          <SelectComponent
          label="State"
          name="state"
          onChange={handleChange}/>
        )}

        {/* ExpandMoreicon */}
        <Box>
          <IconButton onClick={toggleCollapse}>
            <ExpandMore></ExpandMore>
          </IconButton>
        </Box>

        <Collapse in={collapseOpen}>
        <SelectComponent
          label="abc"
          name="abc"
         
        />
        </Collapse>
          <Button type="submit">Submit</Button>
        <button type="button" onClick={handleClear}>
          Clear
          </button>
        <button disable={!confidenceScoreEnable}>Details</button>
      </form>

      <NetworkTable apiRef={apiRef} transactionType={formData.header.ticketType} data={data} />
       
       <Dialog open={openTable} onClose={handleCloseTableDialog}>
          <DialogTitle>
            <Button onClick={toggleTable}>
              {showMainTable ? 'Trans View' : 'Detail View'}
            </Button>
            <IconButton onClick={handleCloseTableDialog}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {showMainTable ?<ConfidenceScoretable data ={confidencedata}/>:<TransposeView data={confidencedata}/>}
          </DialogContent>
       </Dialog>

       <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
          Error
          </DialogTitle>
          <DialogContent>
           <p>{responseMessage}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
       </Dialog>

       <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>
          Required msg Field
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Please Ebter master ID</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogActions>
       </Dialog>

       <Backdrop
        open={loading}
      >
         <CircularProgress/>
       </Backdrop>
    </div>
  );
};

export default SearchNetwork;
