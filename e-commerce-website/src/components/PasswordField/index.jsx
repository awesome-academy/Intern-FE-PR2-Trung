import React, { useState } from 'react'
import { ErrorMessage, useField } from 'formik'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

function PasswordField(props) {
  const [field, meta] = useField(props)
  const { name } = field
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <>
      <TextField
        id={name}
        variant="outlined"
        autoComplete="off"
        fullWidth
        size="medium"
        margin="normal"
        error={meta.touched && meta.error ? true : false}
        {...field}
        {...props}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          style: { fontSize: 14 },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                onMouseDown={handleShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <ErrorMessage component="div" name={name} className="error" />
    </>
  )
}

export default PasswordField
