import React from 'react'
import classnames from 'classnames'
import Loader from '@/components/common/loader'
import css from '@/css/modules/thumbnail.css.module'
import navigate from '@/utils/navigate'

class Card extends React.PureComponent {
  static defaultProps = {
    src: null,
    showOverlay: false,
  }

  constructor(props) {
    super(props)
    this.state = { ready: false }
  }

  handleLoad = () => {
    this.setState({ ready: true })
  }

  render() {
    const { src, showOverlay } = this.props
    const { ready } = this.state

    const thumbnailStyle = {
      backgroundImage: src ? `url(${src})` : 'none',
    }

    return (
      <div className={!ready ? css.thumb : css.thumbReady}>
        <div className={classnames(css.overlay, { [css.overlayShow]: showOverlay })}>
          {this.props.children}
        </div>
        <div className={css.picture} style={thumbnailStyle} />
        <img src={src} onLoad={this.handleLoad} />
      </div>
    )
  }
}

export default Card
