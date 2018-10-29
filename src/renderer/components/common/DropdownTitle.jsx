import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import React from 'react'

const DropdownTitle = ({ onClick, text, iconPath }) => (
  <div className="dropdown-title" onClick={onClick}>
    <a className="dropdown-button">{text}</a>
    {iconPath && <Icon path={iconPath} className=" icon dropdown-icon link__icon" />}
  </div>
)

DropdownTitle.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  iconPath: PropTypes.string,
}

export default DropdownTitle
