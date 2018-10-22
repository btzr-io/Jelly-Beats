import React from 'react'
import PropTypes from 'prop-types'
import DropdownSubmenu from './dropdownSubmenu'

const handleSubmenuClick = (subitem, close) => {
  subitem.action()
  close()
}
const DropdownSubmenuList = ({ items, close }) => (
  <ul>
    {items.map(subitem => (
      <DropdownSubmenu
        key={subitem.key}
        title={subitem.title}
        action={() => handleSubmenuClick(subitem, close)}
      />
    ))}
  </ul>
)

DropdownSubmenuList.propTypes = {
  items: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired,
}

export default DropdownSubmenuList
