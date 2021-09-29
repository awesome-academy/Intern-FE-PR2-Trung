import React from 'react'
import { ErrorMessage, useField } from 'formik'
import './styles.scss'

function TextareaField(props) {
  const [field, meta] = useField(props)
  const { name } = field

  return (
    <>
      <textarea
        id={name}
        {...field}
        {...props}
        className={`${props.className} ${
          meta.touched && meta.error ? 'textarea--error' : ''
        }`}
      />
      <ErrorMessage component="div" name={name} className="error" />
    </>
  )
}

export default TextareaField
