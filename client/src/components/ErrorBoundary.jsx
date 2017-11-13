import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../stylesheets/ErrorPage.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, })
    console.log('error:', error)
    console.log('info:', info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <figure className="gone-surfing-icon lrg-icon" />
          <h1 className="main-title">Hmmm, something went wrong..</h1>
          <p className="copy-text">
            We are gone surfing, but you can try refreshing the page. On the bright side, it is
            better than getting skunked on a surf trip!
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default ErrorBoundary
