import React from 'react'
import Footer from '../Footer'
import PropTypes from 'prop-types'
import LightHeader from '../LightHeader'

AdminLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

function AdminLayout({ children }) {
  return (
    <div>
      <LightHeader title="Admin" hasSearch={true} />
      {children}
      <Footer />
    </div>
  )
}

export default AdminLayout
