import { FormControl, makeStyles, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { languageActions } from 'src/components/LanguageSelect/language.slice'
import viLanguage from 'src/assets/images/vi-language.jpg'
import enLanguage from 'src/assets/images/en-language.jpg'

const useStyles = makeStyles(theme => ({
  formControl: {
    '& .MuiOutlinedInput-input': {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    '& .MuiSelect-iconOutlined': {
      display: 'none'
    }
  }
}))

function LanguageSelect(props) {
  const { language } = useSelector(state => state.language)
  const dispatch = useDispatch()
  const classes = useStyles()
  const { i18n } = useTranslation()

  const handleChangeLanguge = event => {
    dispatch(languageActions.changeLanguage(event.target.value))
    i18n.changeLanguage(event.target.value)
  }

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={language}
        variant="outlined"
        onChange={event => handleChangeLanguge(event)}
      >
        <MenuItem value="vi">
          <img src={viLanguage} alt="vi language" style={{ height: 20 }} />
        </MenuItem>
        <MenuItem value="en">
          <img src={enLanguage} alt="en language" style={{ height: 20 }} />
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default LanguageSelect
