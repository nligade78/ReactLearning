import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  FormControl,
  IconButton,
} from "@mui/material";
import ResponsiveCard from "../Components/ResponsiveCard";
import SelectComponent from "../InputesFields/SelectComponent";
import TextFieldComponent from "../InputesFields/TextFieldComponent";
import { lob, transactionTypeOptions } from "../Constants/Constants";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info"; // Import Info icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import Account Circle icon
import HelpIcon from "@mui/icons-material/Help"; // Import Help icon
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import BlockIcon from '@mui/icons-material/Block';
import {
  handleTransactionTypeChange,
  handleChange,
  handleSubmit,
  handleClear,
  toggleDrawer,
  handleMultiSelectChange,
} from "./formHandlers"; // Import the handlers
import UsersTable from "../Table/UsersTable";
import { handleBlur } from "../Utility/validation";
import MultiSelectComponent from "../InputesFields/MultiSelectComponent";
import { add_linkage } from "../InputPayload/add_linkage";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const BrightPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [formData, setFormData] = useState(add_linkage);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  return (
    <Box
      display="grid"
      gridTemplateColumns={`${isDrawerOpen ? "10%" : "5%"} ${isDrawerOpen ? "70%" : "75%"} 18%`}
      gap="10px"
      padding="10px"
    >
      <Box>
        <ResponsiveCard
      
          sx={{
            border: "1px solid #ddd",
            padding: isDrawerOpen ? "16px" : "8px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "width 0.3s",
            backgroundColor: '#f5f5f5'
          }}
        >
          <IconButton onClick={toggleDrawer(setIsDrawerOpen)} size="small">
            <MenuIcon />
          </IconButton>
          {isDrawerOpen && (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0.1 }}>
              <IconButton onClick={() => navigate("/home")}>
                <HomeIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>Home</Typography>
              </IconButton>
              <IconButton onClick={() => navigate("/settings")}>
                <SettingsIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>Settings</Typography>
              </IconButton>
              <IconButton onClick={() => navigate("/info")}>
                <InfoIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>Info</Typography>
              </IconButton>
              <IconButton onClick={() => navigate("/account")}>
                <AccountCircleIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>Account</Typography>
              </IconButton>
              <IconButton onClick={() => navigate("/help")}>
                <HelpIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>Help</Typography>
              </IconButton>
              <IconButton onClick={() => navigate("/delete")}>
                <DeleteIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>Delete</Typography>
              </IconButton>
              <IconButton onClick={() => navigate("/delete")}>
                <AddIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>Add</Typography>
              </IconButton>
              <IconButton onClick={() => navigate("/add")}>
                <AlarmAddIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>Alarm</Typography>
              </IconButton>
              <IconButton onClick={() => navigate("/block")}>
                <BlockIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>Delete</Typography>
              </IconButton>
            </Box>
          )}
          {!isDrawerOpen && (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.9 }}>
              <IconButton onClick={() => navigate("/home")}>
                <HomeIcon />
              </IconButton>
              <IconButton onClick={() => navigate("/settings")}>
                <SettingsIcon />
              </IconButton>
              <IconButton onClick={() => navigate("/info")}>
                <InfoIcon />
              </IconButton>
              <IconButton onClick={() => navigate("/account")}>
                <AccountCircleIcon />
              </IconButton>
              <IconButton onClick={() => navigate("/help")}>
                <HelpIcon />
              </IconButton>
              <IconButton onClick={() => navigate("/delete")}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => navigate("/delete")}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={() => navigate("/alarm")}>
                <AlarmAddIcon />
              </IconButton>
              <IconButton onClick={() => navigate("/block")}>
                <BlockIcon />
              </IconButton>
            </Box>
          )}
        </ResponsiveCard>
      </Box>

      <Box>
        <ResponsiveCard sx={{ backgroundColor: '#f5f5f5'}}>
          <UsersTable />
        </ResponsiveCard>
      </Box>

      <Box>
        <ResponsiveCard
          sx={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            height: "calc(100vh - 100px)",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "25px",
             backgroundColor: '#f5f5f5'
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              paddingRight: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl
              sx={{
                overflowY: "auto",
                height: "380px",
                "&::-webkit-scrollbar": { display: "none" },
                
              }}
            >
              {/* <Typography variant="h6">Right Side Form</Typography> */}
              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e, formData)}
                mt={2}
              >
                <Box mb={1}>
                  <SelectComponent
                    label="Transaction type"
                    name="transactionType"
                    value={formData.header.ticketType}
                    onChange={handleTransactionTypeChange(setFormData)}
                    options={transactionTypeOptions}
                  />
                </Box>
                <Box mb={1}>
                  <TextFieldComponent
                    label="Master Prov ID"
                    name="profile.masterProvID"
                    value={formData.profile.masterProvID}
                    onChange={handleChange(setFormData)}
                    size="small"
                    onBlur={(e) => handleBlur(e, setFormErrors)}
                    error={!!formErrors["profile.masterProvID"]}
                    helperText={formErrors["profile.masterProvID"]}
                  />
                </Box>
                <Box mb={1}>
                  <MultiSelectComponent
                    label="LOB"
                    name="header.originalDetails.LOB"
                    size="small"
                    value={formData.header.originalDetails.LOB || []}
                    onChange={handleMultiSelectChange(setFormData)}
                    options={lob}
                  />
                </Box>
                {/* Add additional fields here */}
              </Box>
            </FormControl>
          </Box>

          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "#fff",
              padding: "16px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              borderTop: "1px solid #ddd",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => handleSubmit(e, formData)}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleClear(setFormData, setFormErrors)}
            >
              Clear
            </Button>
          </Box>
        </ResponsiveCard>
      </Box>
    </Box>
  );
};

export default BrightPage;
