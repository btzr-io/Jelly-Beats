import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import React from 'react'

const DropdownTitle = ({ onClick, text, icon }) => (
  <div className="dropdown-title" onClick={onClick}>
    <a className="dropdown-button">{text}</a>
    {icon && <Icon path={icon} className=" icon dropdown-icon link__icon" />}
  </div>
)

DropdownTitle.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

export default DropdownTitle
