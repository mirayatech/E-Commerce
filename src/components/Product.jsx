import React from 'react'
import { Typography } from '@mui/material'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material'

import { AddShoppingCart } from '@mui/icons-material'

const Product = ({ product, onAddToCart }) => {
  return (
    <Card sx={{ height: 350 }}>
      <CardMedia
        image={product.image.url}
        component="img"
        alt={product.name}
        title={product.name}
        sx={{
          objectFit: 'cover',
          objectPosition: 'center',
          width: '100%',
          height: '50%',
        }}
      />

      <CardContent>
        <CardContent
          sx={{
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5" component="h2" noWrap>
            {product.name}
          </Typography>
          <Typography variant="h5" component="h3">
            {product.price.formatted_with_symbol}
          </Typography>
        </CardContent>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>

      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          aria-label="Add to Cart"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product
