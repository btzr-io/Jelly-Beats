import PropTypes from 'prop-types'
import React from 'react'
import Icon from '@mdi/react'
import * as icons from '@/constants/icons'
import ClickOutsideDetect from './ClickOutsideDetect'

class Dropdown extends React.PureComponent {
  state = {
    open: false,
    submenuStates: {},
  }

  toggleList = () =>
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
                  path={open ? icons.LEFT : icons.DOWN}
                  className=" icon dropdown-icon link__icon"
                />
              </div>
              {open && (
                <ul>
                  {dropdownItems.map(dropdownItem => (
                    <li key={dropdownItem.key}>
                      <div
                        className="title"
                        onClick={() =>
                          this.hasSubitems(dropdownItem)
                            ? this.toggleSubmenu(dropdownItem.key)
                            : dropdownItem.action()
                        }
                      >
                        <a>{dropdownItem.title}</a>
                        {this.hasSubitems(dropdownItem) && (
                          <Icon
                            path={icons.RIGHT}
                            className="icon dropdown-icon link__icon"
                          />
                        )}
                      </div>
                      {this.hasSubitems(dropdownItem) && (
                        <ul>
                          {submenuStates[dropdownItem.key] &&
                            dropdownItem.subitems.map(subitem => (
                              <li key={subitem.key} onClick={subitem.action}>
                                <div className="title">
                                  <a>{subitem.title}</a>
                                </div>
                              </li>
                            ))}
                        </ul>
                      )}
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
