/* @flow */

import * as React from 'react'
import PropTypes from 'prop-types'

import '../stylesheets/Button.css'

type Props = {
  children?: React.Node,
  onClick: Function,
}
/*
Simple stateless functional componentthat renders the navbar in the top level of the app so
that it is present in every section of the app.
It is connected to react-router, since that's what we use for routing.
*/
class Button extends React.PureComponent<Props> {
  static defaultProps: Object
  render() {
    return (
      <div className="hover-btn">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => this.props.onClick()}
        >
          {this.props.children}
        </button>
      </div>
    )
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  children: 'Button',
}
export default Button
