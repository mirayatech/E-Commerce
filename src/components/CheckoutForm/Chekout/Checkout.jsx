import React, { useState, useEffect } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  Container,
} from '@mui/material'
import { commerce } from '../../../library/commerce'
import AdressForm from '../AdressForm'
import PaymentForm from '../PaymentForm'
import { Link } from 'react-router-dom'
const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, onCaptureCheckout }) => {
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})
  const [isFinished, setIsFinished] = useState(false)

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        })
        setCheckoutToken(token)
      }
      generateToken()
    }
  }, [cart])

  const test = (data) => {
    setShippingData(data)
    nextStep()
  }

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true)
    }, 3000)
  }

  let Confirmation = () =>
    isFinished ? (
      <>
        <div>
          <Typography variant="h5" component="h2" sx={{ mb: '20px' }}>
            Thank you for your purchase!
          </Typography>
          <Divider />
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    ) : (
      <div>
        <CircularProgress />
      </div>
    )

  const Form = () =>
    activeStep === 0 ? (
      <AdressForm
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
      />
    )

  return (
    <>
      <Container sx={{ marginTop: '30px' }}>
        <Paper sx={{ padding: '30px', width: '600px', margin: 'auto' }}>
          <Typography variant="h4" component="h1" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ padding: '10px 0 30px 0' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </Container>
    </>
  )
}

export default Checkout
