import React, { useState } from "react";
import {
  inputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  InputLabel,
} from "@mui/material";

import { useForm, FormProvider } from "react-hook-form";

import FormInput from "./CostumTextField";

function AdressForm() {
  const [shippingCountries, setShippingCountries] = useState([]);
  // chosen country
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  // chosen shipping subvision
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  // chosen shippingOption
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Adress
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First Name" />
            <FormInput required name="lastName" label="Last Name" />
            <FormInput required name="adress1" label="Adress" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="ZIP / Postal Code" />

            {/* SelectField */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={""} fullWidth onChange={""}>
                <MenuItem key={""} value={""}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={""} fullWidth onChange={""}>
                <MenuItem key={""} value={""}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={""} fullWidth onChange={""}>
                <MenuItem key={""} value={""}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
}
export default AdressForm;
