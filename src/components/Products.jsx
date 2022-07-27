import React from "react";
import Product from "./Product";
import { Grid } from "@mui/material";

export default function Products({ products, onAddToCart }) {
  return (
    <main
      style={{
        flexGrow: "1",
        paddingTop: "80px",
        backgroundColor: "#fafafa",
      }}
    >
      <div />
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={10} sm={6} md={4} lg={2.5}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
