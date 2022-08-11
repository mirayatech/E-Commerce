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

type CartType = {
  item: {
    image: {
      url: string
    }
    name: string
  }
}

type CartProps = {
  cart: CartType
  onUpdateCartQty: (lineItemId: string, quantity: number) => Promise<void>
  onRemoveFromCart: (lineItemId: string) => Promise<void>
}

const theme = createTheme({
  palette: {
    primary: { main: '#212121' },
    secondary: { main: '#E53935' },
  },
})

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }: CartProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardMedia
          image={item.image.url}
          alt={item.name}
          sx={{ height: 260 }}
        />
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="h5" component="h2">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Container style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              aria-label="decrease"
              type="button"
              size="small"
              color="primary"
              onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <Typography component="h3">&nbsp;{item.quantity}&nbsp;</Typography>
            <Button
              type="button"
              size="small"
              color="primary"
              aria-label="increase"
              onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </Container>
          <Button
            aria-label="Remove"
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => onRemoveFromCart(item.id)}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  )
}
export default CartItem
