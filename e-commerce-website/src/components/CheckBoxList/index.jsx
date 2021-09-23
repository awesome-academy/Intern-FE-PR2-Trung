import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'

CheckBoxList.propTypes = {
  name: PropTypes.string,
  optionList: PropTypes.array,
  filters: PropTypes.object,
  handleChange: PropTypes.func
}

function CheckBoxList({ name, optionList, filters, handleChange }) {
  const handleCheckBox = event => {
    let selectedOptions
    if (filters[`${name}.id`] === undefined) {
      selectedOptions = []
    } else if (typeof filters[`${name}.id`] === 'string') {
      selectedOptions = [filters[`${name}.id`]]
    } else {
      selectedOptions = [...filters[`${name}.id`]]
    }

    let newSelectOptions = event.target.checked
      ? [...selectedOptions, event.target.id]
      : [...selectedOptions.filter(option => option !== event.target.id)]
    handleChange(newSelectOptions)
  }

  return (
    <div className="checkbox-list">
      <ul className="checkbox-list__list">
        {optionList?.map((option, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={option.id}
              value={option.name}
              checked={Boolean(
                filters[`${name}.id`] &&
                  (typeof filters[`${name}.id`] === 'string'
                    ? filters[`${name}.id`] === option.id
                    : filters[`${name}.id`].includes(option.id))
              )}
              onChange={event => handleCheckBox(event)}
            />
            <label htmlFor={option.id}>
              {option.name} ({option.qty})
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CheckBoxList
