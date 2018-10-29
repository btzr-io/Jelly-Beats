import React from 'react'
import PropTypes from 'prop-types'
import DropdownTitle from './DropdownTitle'

const handleSubmenuClick = (subitem, close) => {
  subitem.action()
  close()
}
const DropdownSubmenuList = ({ items, close }) => (
  <ul className="dropdown-list dropdown-submenu-list dropdown-sublist">
    {items.map(subitem => (
      <li className="dropdown-line  dropdown-sub-line" key={subitem.key}>
        <DropdownTitle
          text={subitem.title}
          onClick={() => handleSubmenuClick(subitem, close)}
        />
      </li>
    ))}
  </ul>
)

DropdownSubmenuList.propTypes = {
  items: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired,
}

export default DropdownSubmenuList
