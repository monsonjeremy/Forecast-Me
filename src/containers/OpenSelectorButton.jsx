import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { action as toggleSelector } from 'redux-burger-menu'

import Button from '../components/Button'

import '../stylesheets/OpenSelectorButton.css'

class OpenSelectorButton extends Component {
  constructor(props) {
    super(props)

    this.renderOpenSelectorButton = this.renderOpenSelectorButton.bind(this)
  }

  componentWillMount() {}

  renderOpenSelectorButton() {
    return (
      <div className="open-selector-btn">
        <Button text={'Open Spot Selector'} onClick={() => this.props.toggleSelector()} />
      </div>
    )
  }

  render() {
    return this.renderOpenSelectorButton()
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  toggleSelector: () => dispatch(toggleSelector(true)),
})

OpenSelectorButton.propTypes = {
  toggleSelector: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenSelectorButton)
