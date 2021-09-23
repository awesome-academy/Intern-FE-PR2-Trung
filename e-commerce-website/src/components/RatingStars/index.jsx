import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import './styles.scss'
import PropTypes from 'prop-types'

RatingStars.propTypes = {
  rate: PropTypes.number
}

function RatingStars(props) {
  return (
    <span className="rating-stars">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index}>
          {index < props.rate ? (
            <FaStar key={index} />
          ) : (
            <FaRegStar key={index} />
          )}
        </span>
      ))}
    </span>
  )
}

export default RatingStars
