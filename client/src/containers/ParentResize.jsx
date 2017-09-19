import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

export default function withParentSize(BaseComponent) {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        parentWidth: null,
        parentHeight: null,
      }

      this.handleResize = debounce(this.resize.bind(this), props.windowResizeDebounceTime).bind(
        this
      )
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize, false)
      this.resize()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize, false)
    }

    resize() {
      if (this.container) {
        const boundingRect = this.container.getBoundingClientRect()
        this.setState(() => ({
          parentWidth: boundingRect.width,
          parentHeight: boundingRect.height,
        }))
      }
    }

    render() {
      const { parentWidth, parentHeight, } = this.state
      return (
        <div
          style={{ width: '100%', height: '100%', }}
          ref={(ref) => {
            this.container = ref
          }}
        >
          {parentWidth !== null &&
          parentHeight !== null && (
            // eslint-disable-next-line
            <BaseComponent parentWidth={parentWidth} parentHeight={parentHeight} {...this.props} />
            )}
        </div>
      )
    }
  }

  WrappedComponent.defaultProps = {
    windowResizeDebounceTime: 300,
  }

  WrappedComponent.propTypes = {
    windowResizeDebounceTime: PropTypes.number,
  }

  return WrappedComponent
}
