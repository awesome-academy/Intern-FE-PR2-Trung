import PropTypes from 'prop-types'
import React from 'react'
import Slider from 'react-slick'
import CircleNextBtn from '../CircleNextBtn'
import CirclePreviousBtn from '../CirclePreviousBtn'
import './styles.scss'

BrandsSlider.propTypes = {
  brands: PropTypes.array
}

function BrandsSlider({ brands }) {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    rows: 2,
    slidesPerRow: 1,
    speed: 500,
    slidesToShow: 3
  }

  return (
    <ul className="brands-slider">
      {brands.length ? (
        <Slider
          {...settings}
          prevArrow={<CirclePreviousBtn />}
          nextArrow={<CircleNextBtn />}
          className="slider--circle-btn"
        >
          {brands.map(brand => (
            <li className="brands-slider__image" key={brand.id}>
              <img src={brand.imageUrl} alt="brand" />
            </li>
          ))}
        </Slider>
      ) : (
        <p>Chưa có thương hiệu</p>
      )}
    </ul>
  )
}

export default BrandsSlider
