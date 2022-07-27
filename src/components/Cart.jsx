import React from "react";
import { Container, Button, Typography, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Cart({ cart }) {
  const theme = createTheme({
    palette: {
      primary: { main: "#212121" },
      secondary: { main: "#2196f3" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div />
        <Typography
          variant="h6"
          sx={{
            marginTop: "10%",
          }}
        >
          Your Shopping Cart
        </Typography>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <div>{item.name}</div>
            </Grid>
          ))}
        </Grid>
        <div
          style={{
            display: "flex",
            marginTop: "10%",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              size="large"
              type="button"
              variant="contained"
              color="primary"
              sx={{
                marginRight: "10px",
                minWidth: "150px",
                marginBottom: "5px",
              }}
            >
              Empty Button
            </Button>
            <Button
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              sx={{
                marginLeft: "10px",

                minWidth: "150px",
                marginBottom: "5px",
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}
