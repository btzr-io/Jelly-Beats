import React from 'react'
import PropTypes from 'prop-types'
import DropdownSubmenu from './dropdownSubmenu'

const DropdownSubmenuList = ({ items }) => (
  <ul>
    {items.map(subitem => (
      <DropdownSubmenu key={subitem.key} title={subitem.title} action={subitem.action} />
    ))}
  </ul>
)

DropdownSubmenuList.propTypes = {
  items: PropTypes.array.isRequired,
}

export default DropdownSubmenuList
