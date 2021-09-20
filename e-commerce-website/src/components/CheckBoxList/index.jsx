import React from 'react'
import './styles.scss'

function CheckBoxList(props) {
  return (
    <div className="checkbox-list">
      <ul className="checkbox-list__list">
        {props.optionList?.map((option, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={index + props.name}
              value={option.name}
            />
            <label htmlFor={index + props.name}>
              {option.name} ({option.qty})
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CheckBoxList
