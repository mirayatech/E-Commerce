import React, { useState, useEffect } from 'react'
import { commerce } from './library/commerce'
import { Products, Navbar, Cart, Checkout } from './components'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  // fetching products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  // fetching cart
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  // Add Product to cart
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }

  // Updating product quantity
  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity })
    setCart(response.cart)
  }

  // Remove product from cart
  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId)
    setCart(response.cart)
  }

  // Empty cart
  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty()
    setCart(response.cart)
  }

  // Refresh Cart
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  // Get all data when checking out
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      )
      refreshCart()

      setOrder(incomingOrder)
    } catch (error) {
      refreshCart()

      setErrorMessage(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route
          path="/"
          element={
            <Products products={products} onAddToCart={handleAddToCart} />
          }
        ></Route>

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          }
        ></Route>
        <Route
          path="/Checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default App
