import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import './styles.scss'

function QuantityController({ max, value, onChange }) {
  const handleInputChange = event => {
    let inputValue = Number(event.target.value)

    if (inputValue > max) {
      inputValue = max
    } else if (inputValue < 1) {
      inputValue = 1
    }

    onChange && onChange(inputValue)
  }

  const increaseNumber = () => {
    let inputValue = value + 1

    if (inputValue > max) {
      inputValue = max
    }

    onChange && onChange(inputValue)
  }

  const descreseNumber = () => {
    let inputValue = value - 1

    if (inputValue < 1) {
      inputValue = 1
    }

    onChange && onChange(inputValue)
  }

  return (
    <div className="quantity-controller">
      <button className="quantity-controller__btn" onClick={descreseNumber}>
        <FaMinus />
      </button>
      <input
        type="number"
        className="quantity-controller__input"
        min={1}
        max={max}
        value={value}
        onChange={handleInputChange}
      />
      <button className="quantity-controller__btn" onClick={increaseNumber}>
        <FaPlus />
      </button>
    </div>
  )
}

export default QuantityController
