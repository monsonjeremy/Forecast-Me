/* @flow */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReduxBurgerMenu from '../containers/ReduxBurgerMenu'
import DropdownSelector from './DropdownSelector'

import '../stylesheets/SpotSelectDrawer.css'

class SpotSelectDrawer extends PureComponent {
  render() {
    const selectedRegion = this.props.appState.selectedRegion

    const regionDropdownProps = {
      options: this.props.options,
      title: 'Region Selector',
      type: 'region',
      itemClick: this.props.fetchRegion,
    }

    let spotOptions = null

    if (selectedRegion !== null) {
      spotOptions = selectedRegion.spots
    }

    const spotDropdownProps = {
      isDisabled: selectedRegion === null,
      title: 'Spot Selector',
      type: 'spot',
      itemClick: this.props.fetchSpot,
      options: spotOptions,
    }

    return (
      <ReduxBurgerMenu
        pageWrapId={this.props.pageWrapId}
        outerContainerId={this.props.outerContainerId}
        isOpen={this.props.burgerMenu.isOpen}
        right
        customBurgerIcon={false}
      >
        <DropdownSelector {...regionDropdownProps} />
        <DropdownSelector {...spotDropdownProps} />
      </ReduxBurgerMenu>
    )
  }
}

SpotSelectDrawer.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      spots: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  appState: PropTypes.shape({
    selectedRegion: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      spots: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
  }).isRequired,
  burgerMenu: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  fetchRegion: PropTypes.func.isRequired,
  fetchSpot: PropTypes.func.isRequired,
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired,
}

export default SpotSelectDrawer
