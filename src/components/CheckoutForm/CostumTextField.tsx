import { TextField, Grid } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

type FormInputProps = {
  name: string
  label: string
}

export const FormInput = ({ name, label }: FormInputProps) => {
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
