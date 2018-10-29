import { DOWN as down, LEFT as left, RIGHT as right } from '@/constants/icons'
import PropTypes from 'prop-types'
import React from 'react'
import DropdownPortal from './DropdownPortal'
import DropdownSubmenuList from './DropdownSubmenuList'
import DropdownTitle from './DropdownTitle'

class Dropdown extends React.PureComponent {
  state = {
    open: false,
    submenuStates: {},
    style: {},
  }

  toggleList = _ =>
    this.setState(prevState => {
      const { submenuStates } = this.state
      let style = {}
      // close the opened submenus
      if (prevState.open) {
        for (const key of Object.keys(submenuStates)) {
          submenuStates[key] = false
        }
      } else {
        style = this.showTooltip()
      }
      return { open: !prevState.open, submenuStates, style }
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

  onBlur = event => {
    const { relatedTarget } = event
    if (!relatedTarget || !relatedTarget.className.includes('dropdown-list')) {
      this.closeIfOpen()
    }
  }

  showTooltip() {
    this.width = 170
    this.space = 0
    const style = { width: this.width, position: 'absolute' }
    const dimensions = this.el.getBoundingClientRect()

    if (dimensions.top < window.innerHeight / 2) {
      style.top = dimensions.top + dimensions.height + this.space
    } else {
      style.bottom = window.innerHeight - dimensions.top + this.space
    }

    return style
  }

  render() {
    const { dropdownItems, header } = this.props
    const { open, submenuStates, style } = this.state
    return (
      <div tabIndex={0} ref={el => (this.el = el)} onBlur={this.onBlur}>
        <ul className="dropdown-list">
          <li>
            <DropdownTitle
              text={header}
              onClick={this.toggleList}
              icon={open ? left : down}
            />
            {open && (
              <DropdownPortal>
                <div style={style}>
                  <ul className="dropdown-list" tabIndex={1}>
                    {dropdownItems.map(dropdownItem => (
                      <li key={dropdownItem.key} className="dropdown-line">
                        <DropdownTitle
                          text={dropdownItem.title}
                          onClick={() => this.handleMenuClick(dropdownItem)}
                          icon={this.hasSubitems(dropdownItem) ? right : null}
                        />
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
                </div>
              </DropdownPortal>
            )}
          </li>
        </ul>
      </div>
    )
  }
}

Dropdown.propTypes = {
  dropdownItems: PropTypes.array.isRequired,
}

export default Dropdown
