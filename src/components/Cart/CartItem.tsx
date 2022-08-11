import type { Cart } from '@chec/commerce.js/types/cart'
import type { LineItem } from '@chec/commerce.js/types/line-item'

import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

type CartItemProps = {
  cart: Cart
  lineItem: LineItem
  onUpdateCartQty: (lineItemId: string, quantity: number) => Promise<void>
  onRemoveFromCart: (lineItemId: string) => Promise<void>
}

const theme = createTheme({
  palette: {
    primary: { main: '#212121' },
    secondary: { main: '#E53935' },
  },
})

const CartItem = ({
  lineItem,
  onUpdateCartQty,
  onRemoveFromCart,
}: CartItemProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardMedia image={lineItem.image?.url} sx={{ height: 260 }} />
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" component="h2">
            {lineItem.name}
          </Typography>
          <Typography variant="h5" component="h2">
            {lineItem.line_total.formatted_with_symbol}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Container style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              aria-label="decrease"
              type="button"
              size="small"
              color="primary"
              onClick={() =>
                onUpdateCartQty(lineItem.id, lineItem.quantity - 1)
              }
            >
              -
            </Button>
            <Typography component="h3">
              &nbsp;{lineItem.quantity}&nbsp;
            </Typography>
            <Button
              type="button"
              size="small"
              color="primary"
              aria-label={`Increase quantity of ${lineItem.name}`}
              onClick={() =>
                onUpdateCartQty(lineItem.id, lineItem.quantity + 1)
              }
            >
              +
            </Button>
          </Container>
          <Button
            aria-label={`Remove ${lineItem.name}`}
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => onRemoveFromCart(lineItem.id)}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  )
}
export default CartItem
