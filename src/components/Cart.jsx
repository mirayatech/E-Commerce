import React from "react";
import { Container, Button, Typography, Grid } from "@mui/material";
import CartItem from "./CartItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

// Color theme
const theme = createTheme({
  palette: {
    primary: { main: "#2196f3" },
    secondary: { main: "#212121" },
  },
});

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,{" "}
      <Link sx={{ textDecoration: "none" }} color="primary" to="/">
        start adding some.{" "}
      </Link>
    </Typography>
  );

  if (!cart.line_items) return "Loading";

  const renderCart = () => (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem
              item={lineItem}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
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
            color="secondary"
            sx={{
              minWidth: "150px",
              marginBottom: "10px",
              [theme.breakpoints.up("xs")]: {
                marginRight: "20px",
              },
            }}
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            component={Link}
            to="/Checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
            sx={{
              minWidth: "150px",
              marginBottom: "10px",
              [theme.breakpoints.up("xs")]: {
                marginRight: "20px",
              },
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );

  return (
    <Container
      style={{
        backgroundColor: "#fafafa",
      }}
    >
      <div />
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginTop: "100px",
          paddingBottom: "10px",
        }}
      >
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
