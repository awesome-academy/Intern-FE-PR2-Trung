import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import './styles.scss'

BannersSlider.propTypes = {
  banners: PropTypes.array
}

function BannersSlider({ banners }) {
  const PreviousBtn = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <KeyboardArrowLeft fontSize="large" className="banners-slider__icon" />
      </div>
    )
  }

  const NextBtn = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <KeyboardArrowRight fontSize="large" className="banners-slider__icon" />
      </div>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <div className="banners-slider">
      {banners.length ? (
        <Slider
          {...settings}
          prevArrow={<PreviousBtn />}
          nextArrow={<NextBtn />}
        >
          {banners.map((banner, index) => (
            <Link to={banner.link} key={index} className="banners-slider__link">
              <img
                src={banner.imageUrl}
                alt="banner"
                className="banners-slider__image"
              />
            </Link>
          ))}
        </Slider>
      ) : (
        <p>Chưa có banner nào</p>
      )}
    </div>
  )
}

export default BannersSlider
