import { FavoriteBorder } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from 'src/components/RatingStars'
import { path } from 'src/constants/path'
import {
  formatCurrency,
  formatQuantity,
  generateNameId
} from 'src/utils/helper'
import { useTranslation } from 'react-i18next'
import './styles.scss'
import PropTypes from 'prop-types'

ProductItem.propTypes = {
  product: PropTypes.object
}

function ProductItem({ product }) {
  const { t } = useTranslation()

  return (
    <div className="product-item">
      <Link to={path.products + `/${generateNameId(product)}`}>
        <div className="product-item__wrap">
          <div className="product-item__img">
            <img src={product.image} alt="product" />
          </div>
          <div className="product-item__info">
            <h4 className="product-item__title">{product.name}</h4>
            <div className="product-item__price">
              <div className="product-item__price-original">
                {formatCurrency(product.price_before_discount)}
              </div>
              <div className="product-item__price-sale">
                {formatCurrency(product.price)}
              </div>
            </div>
            <div className="product-item__action">
              <span className="product-item__whistlist">
                <FavoriteBorder />
              </span>
              <div className="product-item__sold">
                <RatingStars rate={Math.round(product.rating)} />
                <span style={{ marginLeft: 6, marginRight: 3 }}>
                  {t('productDetail.sold')}
                </span>
                <span>{formatQuantity(product.sold)}</span>
              </div>
            </div>
            <div className="product-item__place">{product.place.name}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductItem
