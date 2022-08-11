import { TextField, Grid } from '@mui/material'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

const FormInput = ({ name, label }) => {
  const { control } = useFormContext()

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Controller
          control={control}
          name={name}
          render={() => (
            <TextField variant="standard" fullWidth label={label} required />
          )}
        />
      </Grid>
    </>
  )
}

export default FormInput
