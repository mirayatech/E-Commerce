import React from 'react'
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

// Color theme
const theme = createTheme({
  palette: {
    primary: { main: '#212121' },
    secondary: { main: '#E53935' },
  },
})

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardMedia
          image={item.image.url}
          alt={item.name}
          sx={{ height: 260 }}
        />
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">{item.name}</Typography>
          <Typography variant="h5">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="button"
              size="small"
              color="primary"
              onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
            <Button
              type="button"
              size="small"
              color="primary"
              onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button
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
