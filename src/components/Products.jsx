import React from "react";
import Product from "./Product";
import { Grid } from "@mui/material";
import { spacing } from "@mui/system";

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
      "https://www.laptopsdirect.co.uk/Images/A1MVVJ2BA_1_Supersize.jpg?v=12",
  },
];

const Products = () => {
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
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
