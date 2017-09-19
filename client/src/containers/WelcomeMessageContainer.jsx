import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { UnmountClosed } from 'react-collapse'

import { viewedWelcomeMessage } from '../actions/appState'

import WelcomeMessage from '../components/WelcomeMessage'

import '../stylesheets/WelcomeMessage.css'

class WelcomeContainer extends Component {
  constructor(props) {
    super(props)

    this.renderWelcomeMessage = this.renderWelcomeMessage.bind(this)
  }

  componentWillMount() {}

  renderWelcomeMessage() {
    return (
      <UnmountClosed isOpened={this.props.appState.showWelcomeMessage}>
        <WelcomeMessage closeClick={this.props.closeClick} />
      </UnmountClosed>
    )
  }

  render() {
    return this.renderWelcomeMessage()
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  closeClick: () => dispatch(viewedWelcomeMessage()),
})

WelcomeContainer.propTypes = {
  appState: PropTypes.shape({
    showWelcomeMessage: PropTypes.bool.isRequired,
  }).isRequired,
  closeClick: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)
