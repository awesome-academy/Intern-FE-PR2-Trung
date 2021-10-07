import React from 'react'
import { FaShoppingCart, FaUserAlt, FaCheck } from 'react-icons/fa'
import { Container } from '@material-ui/core'
import './styles.scss'

function CheckoutProgressBar({ step }) {
  const progresses = [
    { step: 'cart', title: 'Giỏ hàng', icon: <FaShoppingCart /> },
    { step: 'delivery', title: 'Địa chỉ giao hàng', icon: <FaUserAlt /> },
    { step: 'summary', title: 'Thanh toán', icon: <FaCheck /> }
  ]

  return (
    <div className="progress-bar">
      <Container maxWidth="lg">
        <div className="progress-bar__wrap">
          {progresses.map((progress, index) => (
            <div
              className={`progress-step ${
                step === progress.step ? 'active' : ''
              }`}
              key={index}
            >
              <div className="step-count">{progress.icon}</div>
              <div className="step-description">{progress.title}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default CheckoutProgressBar
