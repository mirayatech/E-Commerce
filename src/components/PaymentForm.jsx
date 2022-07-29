import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

export default function PaymentForm({ checkoutToken }) {
  return (
    <>
      <Review checkoutToken={checkoutToken} />
    </>
  );
}
