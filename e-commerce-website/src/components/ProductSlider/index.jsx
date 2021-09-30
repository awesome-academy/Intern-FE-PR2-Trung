import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './styles.scss'

ProductSlider.propTypes = {
  images: PropTypes.array
}

function ProductSlider({ images }) {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const slider1 = useRef()
  const slider2 = useRef()

  useEffect(() => {
    setNav1(slider1.current)
    setNav2(slider2.current)
  }, [])

  return (
    <div className="product-slider">
      <Slider
        asNavFor={nav2}
        ref={slider => (slider1.current = slider)}
        arrows={false}
        fade={true}
      >
        {images.map((image, index) => (
          <div className="product-slider__main" key={index}>
            <img src={image} alt="product" />
          </div>
        ))}
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={slider => (slider2.current = slider)}
        slidesToShow={5}
        swipeToSlide={true}
        focusOnSelect={true}
        autoplay={true}
        autoplaySpeed={2000}
      >
        {images.map((image, index) => (
          <div className="product-slider__slider" key={index}>
            <img src={image} alt="product" />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProductSlider
