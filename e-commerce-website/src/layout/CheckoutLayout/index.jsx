import React from 'react'
import LightHeader from '../LightHeader'
import Footer from '../Footer'
import PropTypes from 'prop-types'

CheckoutLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

function CheckoutLayout({ children }) {
  return (
    <div>
      <LightHeader title="Thanh Toán" hasSearch={false} />
      {children}
      <Footer />
    </div>
  )
}

export default CheckoutLayout
