/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Cart } from '@chec/commerce.js/types/cart'
import type { Product } from '@chec/commerce.js/types/product'

import { LoadingSpinner } from 'components/spinner/Spinner'
import { useLoadingStore } from 'library/store'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Products, Navbar, Cart as CartComponent, Checkout } from './components'
import { commerce } from './library/commerce'

const App = () => {
  const [products, setProducts] = useState<Product[]>([] as Product[])
  const [cart, setCart] = useState<Cart>({} as Cart)

  const { setStatus } = useLoadingStore()

  const fetchProducts = async () => {
    setStatus('loading')
    const { data } = await commerce.products.list()
    setProducts(data)
    setStatus('success')
  }

  const fetchCart = async () => {
    setStatus('loading')
    setCart(await commerce.cart.retrieve())
    setStatus('success')
  }

  const handleAddToCart = async (productId: string, quantity: number) => {
    setStatus('loading')
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
    setStatus('success')
  }

  const handleUpdateCartQty = async (lineItemId: string, quantity: number) => {
    setStatus('loading')
    const response = await commerce.cart.update(lineItemId, { quantity })
    setCart(response.cart)
    setStatus('success')
  }

  const handleRemoveFromCart = async (lineItemId: string) => {
    setStatus('loading')
    const response = await commerce.cart.remove(lineItemId)
    setCart(response.cart)
    setStatus('success')
  }

  const handleEmptyCart = async () => {
    setStatus('loading')
    const response = await commerce.cart.empty()
    setCart(response.cart)
    setStatus('success')
  }

  const handleCaptureCheckout = async (checkoutTokenId: object) => {
    // @ts-ignore
    await commerce.checkout.capture(checkoutTokenId)
  }

  useEffect(() => {
    setStatus('loading')
    Promise.all([fetchCart(), fetchProducts()])
    setStatus('success')
  }, [])

  return (
    <>
      <Navbar totalItems={cart.total_items} />
      <LoadingSpinner />

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
