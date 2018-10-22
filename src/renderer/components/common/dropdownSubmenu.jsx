import React from 'react'
import PropTypes from 'prop-types'

const DropdownSubmenu = ({ title, action }) => (
  <li onClick={action}>
    <div className="title">
      <a>{title}</a>
    </div>
  </li>
)

DropdownSubmenu.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}

export default DropdownSubmenu
