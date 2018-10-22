import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Component to detect a click outside of component bounds
 * https://stackoverflow.com/a/42234988/852841
 */
export default class ClickOutsideDetect extends Component {
  constructor(props) {
    super(props)
    this.wrapperRef = React.createRef()
  }

  componentDidMount = _ =>
    document.addEventListener('mousedown', this.handleClickOutsideComponent)

  componentWillUnmount = _ =>
    document.removeEventListener('mousedown', this.handleClickOutsideComponent)

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutsideComponent = event => {
    if (!this.wrapperRef || !this.wrapperRef.current) {
      return
    }

    if (!this.wrapperRef.current.contains(event.target)) {
      this.props.handleClickOutside()
    }
  }

  render = _ => <div ref={this.wrapperRef}>{this.props.children}</div>
}

ClickOutsideDetect.propTypes = {
  children: PropTypes.element.isRequired,
  handleClickOutside: PropTypes.func.isRequired,
}
