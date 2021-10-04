import React from 'react'
import LightHeader from '../LightHeader'
import Footer from '../Footer'
import PropTypes from 'prop-types'

CartLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

function CartLayout({ children }) {
  return (
    <div>
      <LightHeader title="Giỏ hàng" hasSearch={true} />
      {children}
      <Footer />
    </div>
  )
}

export default CartLayout
