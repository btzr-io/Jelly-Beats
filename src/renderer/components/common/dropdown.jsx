import PropTypes from 'prop-types'
import React from 'react'
import Icon from '@mdi/react'
import ClickOutsideDetect from './ClickOutsideDetect'
import { DOWN as down, LEFT as left, RIGHT as right } from '@/constants/icons'
import DropdownSubmenuList from './dropdownSubmenuList'

class Dropdown extends React.PureComponent {
  state = {
    open: false,
    submenuStates: {},
  }

  toggleList = _ =>
    this.setState(prevState => {
      const { submenuStates } = this.state
      // close the opened submenus
      if (prevState.open) {
        for (const key of Object.keys(submenuStates)) {
          submenuStates[key] = false
        }
      }
      return { open: !prevState.open, submenuStates }
    })

  toggleSubmenu = item => {
    const itemFound = this.props.dropdownItems.find(dropdown => dropdown.key == item)
    if (!itemFound || !itemFound.subitems) {
      return
    }
    this.setState(prevState => ({
      submenuStates: {
        ...this.state.submenuStates,
        [item]: !prevState.submenuStates[item],
      },
    }))
  }

  closeIfOpen = _ => {
    if (this.state.open) {
      this.toggleList()
    }
  }

  hasSubitems = dropdown => dropdown.subitems

  handleMenuClick = dropdownItem => {
    if (this.hasSubitems(dropdownItem)) {
      return this.toggleSubmenu(dropdownItem.key)
    }
    dropdownItem.action()
    this.closeIfOpen()
  }

  render() {
    const { dropdownItems, header } = this.props
    const { open, submenuStates } = this.state
    return (
      <ClickOutsideDetect handleClickOutside={this.closeIfOpen}>
        <nav className="dropdown">
          <ul>
            <li>
              <div className="title" onClick={this.toggleList}>
                <a>{header}</a>
                <Icon
                  path={open ? left : down}
                  className=" icon dropdown-icon link__icon"
                />
              </div>
              {open && (
                <ul>
                  {dropdownItems.map(dropdownItem => (
                    <li key={dropdownItem.key}>
                      <div
                        className="title"
                        onClick={() => this.handleMenuClick(dropdownItem)}
                      >
                        <a>{dropdownItem.title}</a>
                        {this.hasSubitems(dropdownItem) && (
                          <Icon path={right} className="icon dropdown-icon link__icon" />
                        )}
                      </div>
                      {this.hasSubitems(dropdownItem) &&
                        (submenuStates[dropdownItem.key] && (
                          <DropdownSubmenuList
                            items={dropdownItem.subitems}
                            close={this.closeIfOpen}
                          />
                        ))}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </ClickOutsideDetect>
    )
  }
}

Dropdown.propTypes = {
  dropdownItems: PropTypes.array.isRequired,
}

export default Dropdown
