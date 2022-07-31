import React from 'react'
import { Typography, Button, Divider, Container } from '@mui/material'
import { commerce } from '../../library/commerce'

import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js'

import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  setCart,
  onCaptureCheckout,
  timeout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault()

    const cardElement = elements.getElement(CardElement)

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: 'International',
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: paymentMethod.id,
        },
      },
    }

    const refreshCart = async () => {
      const newCart = await commerce.cart.refresh()
      setCart(newCart)
    }

    onCaptureCheckout(checkoutToken.id, orderData)
    nextStep()
    refreshCart()
    timeout()
  }

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" component="h2" gutterBottom sx={{ my: 3 }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(event) => handleSubmit(event, elements, stripe)}>
              <CardElement />
              <Container
                sx={{
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 0,
                }}
              >
                <Button aria-label="Back" variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  aria-label="Pay"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </Container>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm
