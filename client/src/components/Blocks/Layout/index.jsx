import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'

function Layout({ children }) {
  return (
    <div className="workspace-container">
      {children}
    </div>
  )
}

Layout.defaultProps = {
  children: {},
}

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
