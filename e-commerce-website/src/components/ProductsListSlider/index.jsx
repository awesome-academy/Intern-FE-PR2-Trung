import React from 'react'
import Slider from 'react-slick'
import ProductItem from '../ProductItem'
import PropTypes from 'prop-types'
import './styles.scss'
import CirclePreviousBtn from '../CirclePreviousBtn'
import CircleNextBtn from '../CircleNextBtn'

ProductsListSlider.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array
}

function ProductsListSlider({ title, products }) {
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <div className="products-list-slider">
      <div className="products-list-slider__title">{title}</div>
      {products.length ? (
        <Slider
          {...settings}
          prevArrow={<CirclePreviousBtn />}
          nextArrow={<CircleNextBtn />}
          className="slider--circle-btn"
        >
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Slider>
      ) : (
        <p className="products-list-slider__no-product">Chưa có sản phẩm</p>
      )}
    </div>
  )
}

export default ProductsListSlider
