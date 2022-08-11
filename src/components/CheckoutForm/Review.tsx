import type { CheckoutToken } from '@chec/commerce.js/types/checkout-token'

import { Typography, List, ListItem, ListItemText } from '@mui/material'

type ReviewProps = {
  checkoutToken: CheckoutToken
}

export const Review = ({ checkoutToken }: ReviewProps) => (
  <>
    <Typography variant="h6" component="h2" gutterBottom>
      Order summary
    </Typography>

    <List disablePadding>
      {checkoutToken.live.line_items.map(
        ({ id, name, quantity, line_total: { formatted_with_symbol } }) => (
          <ListItem sx={{ py: 3 }} key={id}>
            <ListItemText primary={name} secondary={`Quantity: ${quantity}`} />
            <Typography variant="body2" component="h2">
              {formatted_with_symbol}
            </Typography>
          </ListItem>
        )
      )}
      <ListItem>
        <ListItemText primary="Total" />
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{ paddingBottom: '20px', fontWeight: 700 }}
        >
          {checkoutToken.live.subtotal.formatted_with_symbol}
        </Typography>
      </ListItem>
    </List>
  </>
)
