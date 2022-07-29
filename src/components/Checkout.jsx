import React, { useState, useEffect } from "react";
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
import { commerce } from "../library/commerce";
import AdressForm from "./AdressForm";
import PaymentForm from "./PaymentForm";
import { CheckOutlined } from "@mui/icons-material";

const Confirmation = () => <div>Confirmation</div>;

const steps = ["Shipping adress", "Payment details"];

export default function Checkout({ cart }) {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  // create a checkouttoke, as soon as someone enters the chekout process
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
      } catch {}
    };

    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AdressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm checkoutToken={checkoutToken} backStep={backStep} />
    );

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
          <Stepper
            activeStep={activeStep}
            spacing={2}
            sx={{ marginBottom: "30px" }}
          >
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* If we are n the laststep  */}
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
}
