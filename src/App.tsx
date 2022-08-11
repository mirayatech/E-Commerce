import { useState, useEffect } from 'react'
import { commerce } from './library/commerce'
import { Products, Navbar, Cart, Checkout } from './components'
import { Routes, Route } from 'react-router-dom'
import { ProductProps } from './components/Products/Products'

const App = () => {
  const [products, setProducts] = useState<ProductProps[]>([])
  const [cart, setCart] = useState({})

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
    // array of objects
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
    // object
  }

  const handleAddToCart = async (productId: string, quantity: number) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }

  const handleUpdateCartQty = async (lineItemId: string, quantity: number) => {
    const response = await commerce.cart.update(lineItemId, { quantity })
    setCart(response.cart)
  }

  const handleRemoveFromCart = async (lineItemId: string) => {
    const response = await commerce.cart.remove(lineItemId)
    setCart(response.cart)
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty()
    setCart(response.cart)
  }

  const handleCaptureCheckout = async (checkoutTokenId: object) => {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId)
    console.log(incomingOrder)
  }

  useEffect(() => {
    Promise.all([fetchCart(), fetchProducts()])
  }, [])

  return (
    <>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route
          path="/"
          element={
            <Products products={products} onAddToCart={handleAddToCart} />
          }
        />

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
        />

        <Route
          path="/Checkout"
          element={
            <Checkout
              cart={cart}
              onCaptureCheckout={handleCaptureCheckout}
              setCart={setCart}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
