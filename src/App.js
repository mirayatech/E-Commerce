import React, { useState, useEffect } from "react";
import { commerce } from "./library/commerce";
import { Navbar, Products } from "./components";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // Get the products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <div>
      <Navbar />
      <Products products={products} />
    </div>
  );
};

export default App;
