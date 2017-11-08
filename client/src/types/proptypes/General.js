/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types'

export const childPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]).isRequired
