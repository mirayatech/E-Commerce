import type { Cart } from '@chec/commerce.js/types/cart'
import type { Product } from '@chec/commerce.js/types/product'

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Products, Navbar, Cart as CartComponent, Checkout } from './components'
import { commerce } from './library/commerce'

const App = () => {
  const [products, setProducts] = useState<Product[]>([] as Product[])
  const [cart, setCart] = useState<Cart>({} as Cart)

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
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
    // @ts-ignore
    await commerce.checkout.capture(checkoutTokenId)
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
            <CartComponent
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
