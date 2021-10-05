import React from 'react'
import { ErrorMessage, useField } from 'formik'
import { TextField } from '@material-ui/core'

function InputField(props) {
  const [field, meta] = useField(props)
  const { name } = field

  return (
    <>
      <TextField
        id={name}
        {...field}
        variant="outlined"
        autoComplete="off"
        fullWidth
        size="medium"
        margin="normal"
        InputProps={{ style: { fontSize: 14 } }}
        InputLabelProps={{ style: { fontSize: 14 } }}
        error={meta.touched && meta.error ? true : false}
        {...props}
      />
      <ErrorMessage component="div" name={name} className="error" />
    </>
  )
}

export default InputField
