import React, { useState, useEffect } from 'react'
import {
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  InputLabel,
  Container,
} from '@mui/material'

import { useForm, FormProvider } from 'react-hook-form'
import { commerce } from '../../library/commerce'
import FormInput from './CostumTextField'
import { Link } from 'react-router-dom'

const AddressForm = ({ checkoutToken, test }) => {
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')
  const methods = useForm()

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    )

    setShippingCountries(countries)
    const supportedShippingCountry = Object.keys(countries)[0]
    setShippingCountry(supportedShippingCountry)
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    )

    setShippingSubdivisions(subdivisions)
    const supportedShippingSubdivision = Object.keys(subdivisions)[0]
    setShippingSubdivision(supportedShippingSubdivision)
  }

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    )

    setShippingOptions(options)
    const firstShippingOption = options[0].id
    setShippingOption(firstShippingOption)
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [checkoutToken.id])

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry)
    }
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubdivision) {
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      )
    }
  }, [checkoutToken.id, shippingCountry, shippingSubdivision])

  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            test({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(event) => setShippingCountry(event.target.value)}
              >
                {Object.entries(shippingCountries)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(event) => setShippingSubdivision(event.target.value)}
              >
                {Object.entries(shippingSubdivisions)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(event) => setShippingOption(event.target.value)}
              >
                {shippingOptions
                  .map((shippingOption) => ({
                    id: shippingOption.id,
                    label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`,
                  }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>

          <Container
            sx={{
              p: 0,
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 3,
              mx: 0,
            }}
          >
            <Button
              aria-label="Back to Cart"
              component={Link}
              variant="outlined"
              to="/cart"
            >
              Back to Cart
            </Button>
            <Button
              aria-label="Next"
              type="submit"
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </Container>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
