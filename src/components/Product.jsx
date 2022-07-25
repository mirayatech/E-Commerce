import React from "react";
import { Typography } from "@mui/material";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";

import { AddShoppingCart } from "@mui/icons-material";
// import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
  console.log(product);
  // const classes = useStyles();
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardMedia
        sx={{ height: 0, paddingTop: "56.25%" }}
        image={product.image.url}
        title={product.name}
      />

      <CardContent>
        <CardContent
          sx={{
            padding: "0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}{" "}
          </Typography>
        </CardContent>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        ></Typography>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <IconButton
          aria-label="Add to Cart"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
