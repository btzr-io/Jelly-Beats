import React from 'react'
import ReactDOM from 'react-dom'

class DropdownPortal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount = _ => document.body.appendChild(this.el)

  componentWillUnmount = _ => document.body.removeChild(this.el)

  render = _ => ReactDOM.createPortal(this.props.children, this.el)
}

export default DropdownPortal
