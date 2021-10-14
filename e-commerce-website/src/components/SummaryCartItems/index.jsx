import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import { formatCurrency, generateNameId } from 'src/utils/helper'
import './styles.scss'

SummaryCartItems.propTypes = {
  cartItems: PropTypes.array.isRequired
}

function SummaryCartItems({ cartItems }) {
  return (
    <>
      <div className="summary-header">
        <div className="summary-header__name">Sản phẩm</div>
        <div className="summary-header__unit-price">Đơn giá</div>
        <div className="summary-header__quantity">Số lượng</div>
        <div className="summary-header__total-price">Thành tiền</div>
      </div>
      <div className="summary-list">
        {cartItems.map(item => (
          <div className="summary-item" key={item.id}>
            <div className="summary-item__info">
              <Link
                className="summary-item__image"
                to={path.products + `/${generateNameId(item)}`}
              >
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="summary-item__name-wrap">
                <Link
                  className="summary-item__name"
                  to={path.products + `/${generateNameId(item)}`}
                >
                  {item.name}
                </Link>
              </div>
            </div>
            <div className="summary-item__unit-price">
              <span>{formatCurrency(item.price_before_discount)}</span>
              <span>{formatCurrency(item.price)}</span>
            </div>
            <div className="summary-item__quantity">{item.inCart}</div>
            <div className="summary-item__total-price">
              <span>{formatCurrency(item.inCart * item.price)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SummaryCartItems
