import React from 'react'
import { ErrorMessage, useField } from 'formik'
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  select: {
    display: 'flex',
    minWidth: 120,
    marginRight: theme.spacing(2)
  }
}))

function SelectField(props) {
  const [field, meta] = useField(props)
  const { name } = field
  const classes = useStyles()

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="place-label">{props.label}</InputLabel>
      <Select
        labelId="place-label"
        id={name}
        className={classes.select}
        {...field}
        error={meta.touched && meta.error ? true : false}
        {...props}
      >
        {props.options.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage component="div" name={name} className="error" />
    </FormControl>
  )
}

export default SelectField
