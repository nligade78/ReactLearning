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
import { transactionTypeOptions } from "../Constants/Constants";
import UsersTable from "../Components/UsersTable";
import MenuIcon from "@mui/icons-material/Menu";

const BrightPage = () => {
  const [formData, setFormData] = useState({
    header: { ticketType: "" },
    profile: { masterProvID: "", lob: "", abc: "" },
    description: [],
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // State to manage drawer open/collapse

  const handleTransactionTypeChange = (event) => {
    setFormData({
      ...formData,
      header: { ...formData.header, ticketType: event.target.value },
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [field, subField] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [field]: { ...prevData[field], [subField]: value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log("Form submitted:", formData);
  };

  const handleClear = () => {
    setFormData({
      header: { ticketType: "" },
      profile: { masterProvID: "", lob: "", abc: "" },
      description: [],
    });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={`${isDrawerOpen ? "10%" : "5%"} ${
        isDrawerOpen ? "70%" : "75%"
      } 18%`} // Adjust center width dynamically
      gap="10px"
      padding="10px"
    >
      {/* Collapsible Drawer */}
      <Box>
        <ResponsiveCard
          sx={{
            border: "1px solid #ddd",
            padding: isDrawerOpen ? "16px" : "8px",
            // width: isDrawerOpen ? "10%" : "18%",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "width 0.3s",
          }}
        >
          <IconButton onClick={toggleDrawer} size="small">
            <MenuIcon />
          </IconButton>
          {isDrawerOpen && (
            <Typography variant="h7">Collapsible Drawer Content</Typography>
          )}
        </ResponsiveCard>
      </Box>

      {/* Main content area */}
      <Box>
        <ResponsiveCard>
          <UsersTable />
        </ResponsiveCard>
      </Box>

      {/* Right-side form */}
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
              <Box component="form" onSubmit={handleSubmit} mt={2}>
                <Box mb={1}>
                  <SelectComponent
                    label="Transaction type"
                    name="transactionType"
                    value={formData.header.ticketType}
                    onChange={handleTransactionTypeChange}
                    options={transactionTypeOptions}
                  />
                </Box>
                <Box mb={1}>
                  <TextFieldComponent
                    label="Master Prov ID"
                    name="profile.masterProvID"
                    value={formData.profile.masterProvID}
                    onChange={handleChange}
                    size="small"
                  />
                </Box>
                <Box mb={1}>
                  <TextFieldComponent
                    label="LOB"
                    name="profile.lob"
                    value={formData.profile.lob || ""}
                    onChange={handleChange}
                    size="small"
                  />
                </Box>
                <Box mb={1}>
                  <TextFieldComponent
                    label="LOB"
                    name="profile.lob"
                    value={formData.profile.lob || ""}
                    onChange={handleChange}
                    size="small"
                  />
                </Box>
                <Box mb={1}>
                  <TextFieldComponent
                    label="LOB"
                    name="profile.lob"
                    value={formData.profile.lob || ""}
                    onChange={handleChange}
                    size="small"
                  />
                </Box>
                <Box mb={1}>
                  <TextFieldComponent
                    label="LOB"
                    name="profile.lob"
                    value={formData.profile.lob || ""}
                    onChange={handleChange}
                    size="small"
                  />
                </Box>
                <Box mb={1}>
                  <TextFieldComponent
                    label="LOB"
                    name="profile.lob"
                    value={formData.profile.lob || ""}
                    onChange={handleChange}
                    size="small"
                  />
                </Box>
                <Box mb={1}>
                  <TextFieldComponent
                    label="LOB"
                    name="profile.lob"
                    value={formData.profile.lob || ""}
                    onChange={handleChange}
                    size="small"
                  />
                </Box>
                {/* Additional fields */}
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
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleClear}
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
