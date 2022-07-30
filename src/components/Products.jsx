import React from 'react'
import Product from './Product'
import { Container, Grid, Typography } from '@mui/material'

const Products = ({ products, onAddToCart }) => {
  return (
    <Container
      sx={{
        backgroundColor: '#fafafa',
      }}
    >
      <Typography variant="h3" component="h1" textAlign="center" mt={3}>
        Products
      </Typography>
      <Grid container spacing={2} justifyContent="center" mt={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={10} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Products
