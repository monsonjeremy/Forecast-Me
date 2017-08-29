/* @flow */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import '../stylesheets/Button.css'

/*
Simple stateless functional componentthat renders the navbar in the top level of the app so
that it is present in every section of the app.
It is connected to react-router, since that's what we use for routing.
*/
class Button extends PureComponent {
  render() {
    return (
      <div className="hover-btn">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => this.props.onClick()}
        >
          {this.props.text}
        </button>
      </div>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default Button
