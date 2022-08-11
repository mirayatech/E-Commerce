import { Product as ProductType } from '@chec/commerce.js/types/product'
import { Container, Grid, Typography } from '@mui/material'
import Product from './Product'

type ProductProps = {
  products: ProductType[]
  onAddToCart: (productId: string, quantity: number) => Promise<void>
}

export const Products = ({ products, onAddToCart }: ProductProps) => {
  return (
    <Container
      sx={{
        backgroundColor: '#fafafa',
      }}
    >
      <Typography variant="h3" component="h1" textAlign="center" my={3}>
        Products
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={10} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
