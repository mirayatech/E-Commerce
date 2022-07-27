import React, { useState, useEffect } from "react";
import { commerce } from "./library/commerce";
import { Products, Navbar, Cart } from "./components";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // Get the products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  // Getting the cart
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  // Add item to cart
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);
  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  );
};

export default App;
