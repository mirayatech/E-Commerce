import type { Cart as CartType } from '@chec/commerce.js/types/cart'

import { Container, Button, Typography, Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link } from 'react-router-dom'

import CartItem from './CartItem'

type CartProps = {
  cart: CartType
  handleUpdateCartQty: (lineItemId: string, quantity: number) => Promise<void>
  handleRemoveFromCart: (lineItemId: string) => Promise<void>
  handleEmptyCart: () => Promise<void>
}

const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#212121' },
  },
})

export const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}: CartProps) => {
  const renderEmptyCart = (
    <Typography
      variant="subtitle1"
      component="h2"
      textAlign="center"
      mt="250px"
    >
      You have no items in your shopping cart,
      <Link style={{ textDecoration: 'none' }} color="primary" to="/">
        start adding some.
      </Link>
    </Typography>
  )

  const renderCart = (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem
              lineItem={lineItem}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              cart={cart}
            />
          </Grid>
        ))}
      </Grid>

      <Container
        sx={{
          mt: 10,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            width: '100%',
          }}
        >
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <Container
          sx={{
            display: 'flex',
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
      <Typography variant="h3" component="h1" textAlign="center" my={3}>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? renderEmptyCart : renderCart}
    </Container>
  )
}
