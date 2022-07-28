import React from "react";
import {
  inputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";

import { useForm, FormProvider } from "react-hook-form";

export default function AdressForm() {
  const methods = useForm();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Adress
        <form onSubmit={""}>
          <Grid spacing={3}></Grid>
        </form>
      </Typography>
    </>
  );
}
