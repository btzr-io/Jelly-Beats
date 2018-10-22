import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Component to detect a click outside of component bounds
 * https://stackoverflow.com/a/42234988/852841
 */
export default class ClickOutsideDetect extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = _ =>
    document.addEventListener('mousedown', this.handleClickOutsideComponent)

  componentWillUnmount = _ =>
    document.removeEventListener('mousedown', this.handleClickOutsideComponent)

  /**
   * Set the wrapper ref
   */
  setWrapperRef = node => (this.wrapperRef = node)

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutsideComponent = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.handleClickOutside()
    }
  }

  render = _ => <div ref={this.setWrapperRef}>{this.props.children}</div>
}

ClickOutsideDetect.propTypes = {
  children: PropTypes.element.isRequired,
  handleClickOutside: PropTypes.func.isRequired,
}
