import React from 'react'
import PropTypes from 'prop-types'
import useAuth from 'src/hooks/useAuth'
import { Redirect } from 'react-router'
import { path } from 'src/constants/path'

AdminGuard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

function AdminGuard({ children }) {
  const { userRole } = useAuth()
  if (userRole !== 'admin') {
    return <Redirect to={path.home} />
  }
  return <>{children}</>
}

export default AdminGuard
