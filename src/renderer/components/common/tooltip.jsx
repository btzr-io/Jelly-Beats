import React, { PureComponent } from 'react'

class Tooltip extends PureComponent {
  render() {
    const { children, title, name } = this.props
    return (
      <div class="tooltip">
        {children}
        <span id={name} class="tooltiptext">
          {title}
        </span>
      </div>
    )
  }
}
export default Tooltip
