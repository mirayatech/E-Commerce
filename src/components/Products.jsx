import React from "react";
import Product from "./Product";
import { Grid } from "@mui/material";

const products = [
  {
    id: 1,
    name: "Air Jordan 1",
    description: "Sneaker shoes",
    price: "$5",
    image:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F12%2FAir-Jordan-1-High-Zoom-CMFT-Pink-Oxford-0.jpg?w=960&cbr=1&q=90&fit=max",
  },
  {
    id: 2,
    name: "Macbook",
    description: "Apple Macbook",
    price: "$100",

    image:
      "https://www.apple.com/newsroom/images/tile-images/Apple_16-inch-MacBook-Pro_111319.jpg.news_app_ed.jpg",
  },
];

const Products = () => {
  return (
    <main>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
