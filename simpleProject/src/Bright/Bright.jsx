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

const BrightPage = () => {
  const [formData, setFormData] = useState(add_linkage); // Correct use of add_linkage for initial form data
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({}); // State for form errors

  return (
    // Main Box
    <Box
      display="grid"
      gridTemplateColumns={`${isDrawerOpen ? "10%" : "5%"} ${
        isDrawerOpen ? "70%" : "75%"
      } 18%`} // Adjust center width dynamically
      gap="10px"
      padding="10px"
    >
      {/* First Box card */}
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
          }}
        >
          <IconButton onClick={toggleDrawer(setIsDrawerOpen)} size="small">
            <MenuIcon />
          </IconButton>
          {isDrawerOpen && (
            <Typography variant="h7">Collapsible Drawer Content</Typography>
          )}
        </ResponsiveCard>
      </Box>

      {/* Second Box Card */}
      <Box>
        <ResponsiveCard>
          <UsersTable />
        </ResponsiveCard>
      </Box>

      {/* Third Box card */}
      <Box>
        <ResponsiveCard
          sx={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            height: "calc(100vh - 100px)", // Full height minus padding
            display: "flex",
            flexDirection: "column",
            paddingBottom: "25px",
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
              <Typography variant="h6">Right Side Form</Typography>
              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e, formData)} // Pass event and formData to handleSubmit
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
                    onBlur={(e) => handleBlur(e, setFormErrors)} // Validate on blur
                    error={!!formErrors["profile.masterProvID"]} // Pass error state
                    helperText={formErrors["profile.masterProvID"]} // Show error message
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

          {/* Buttons */}
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
              onClick={(e) => handleSubmit(e, formData)} // Corrected onClick form submit handler
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
