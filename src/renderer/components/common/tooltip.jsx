import React, { PureComponent } from 'react'

class Tooltip extends PureComponent {
  render() {
    const { children, tip, name } = this.props
    return (
      <div class="tooltip">
        <span>{children}</span>
        <span id={name} class="tooltiptext">
          {tip}
        </span>
      </div>
    )
  }
}
export default Tooltip
