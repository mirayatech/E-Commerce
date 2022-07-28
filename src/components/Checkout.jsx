import React, { useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";

const steps = ["Shipping adress", "Payment details"];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <div style={{ marginTop: "10px" }} />
      <main
        style={{
          backgroundColor: "#fafafa",
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            padding: "30px",
            width: "500px",
            margin: "auto",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ paddingBottom: "30px" }}
          >
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} spacing={2}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* If we are n the laststep  */}
        </Paper>
      </main>
    </>
  );
}
