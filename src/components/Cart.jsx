import React from 'react'
import CartItem from './CartItem'
import {
  Container,
  Button,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#212121' },
  },
})

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const renderEmptyCart = (
    <Typography
      variant="subtitle1"
      component="h1"
      textAlign="center"
      mt="250px"
    >
      You have no items in your shopping cart,{' '}
      <Link sx={{ textDecoration: 'none' }} color="primary" to="/">
        start adding some.
      </Link>
    </Typography>
  )

  if (!cart.line_items) {
    return ''
  }

  const renderCart = (
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

      <Container
        sx={{
          mt: 10,
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            width: '100%',
          }}
        >
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <Container
          sx={{
            display: 'flex',
            width: 'auto',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            aria-label="Empty Cart"
            sx={{
              minWidth: '150px',
              mb: 2,
              mr: 2,
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
            aria-label="Check Out"
            color="primary"
            sx={{
              minWidth: '150px',
              mb: 2,
              mr: 2,
            }}
          >
            Checkout
          </Button>
        </Container>
      </Container>
    </ThemeProvider>
  )

  return (
    <Container
      style={{
        backgroundColor: '#fafafa',
      }}
    >
      <Typography variant="h3" component="h1" textAlign="center" mt={3}>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? renderEmptyCart : renderCart}
    </Container>
  )
}

export default Cart
