/* @flow */

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { SpotSearch, DropdownSelector, Loader } from './'

import '../stylesheets/SideNav.css'

type Props = {
  children: Node,
  fetchSpotList: Function,
  regions: Array<Object>,
  setRegion: Function,
  setSpotWithRegion: Function,
  setSpot: Function,
  selectedRegion: Object,
  spotList: Object,
  spotListIsLoading: boolean,
}

class SideNav extends PureComponent<Props> {
  static defaultProps: Object

  componentWillMount() {
    this.props.fetchSpotList()
  }
  render() {
    const {
      regions,
      setRegion,
      setSpotWithRegion,
      selectedRegion,
      spotList,
      setSpot,
      spotListIsLoading,
    } = this.props

    const regionDropdownProps = {
      options: spotList,
      title: 'Region Selector',
      type: 'region',
      itemClick: setRegion,
    }

    let spotOptions = null

    if (selectedRegion !== null) {
      spotOptions = selectedRegion.spots
    }

    const spotDropdownProps = {
      isDisabled: selectedRegion === null,
      title: 'Spot Selector',
      type: 'spot',
      itemClick: spot => setSpot(spot, selectedRegion),
      options: spotOptions,
    }

    return (
      <section className="sidenav-container">
        {spotListIsLoading && <Loader />}
        <aside className="sidenav-aside">
          <div className="sidenav-title-container">
            <figure className="surfer-icon sidenav-title-icon" />
            <h1 className="sidenav-title">Forecast.it</h1>
          </div>
          <div className="sidenav-links-container">
            <Link to="/forecast" className="sidenav-links forecast-link">
              <Link className="sidenav-link" to="/forecast">
                Forecast
              </Link>
            </Link>
            <Link to="/info" className="sidenav-links info-link">
              <Link className="sidenav-link" to="/info">
                Info
              </Link>
            </Link>
          </div>
          <SpotSearch
            placeholder="Search for a spot or region..."
            regions={regions}
            setRegion={setRegion}
            setSpotWithRegion={setSpotWithRegion}
          />
          <section className="sidenav-container-items">
            <DropdownSelector key={'region-dropdown'} {...regionDropdownProps} />
            <DropdownSelector key={'spot-dropdown'} {...spotDropdownProps} />
          </section>
        </aside>
      </section>
    )
  }
}

SideNav.propTypes = {
  fetchSpotList: PropTypes.func.isRequired,
  regions: PropTypes.arrayOf(
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
  setRegion: PropTypes.func.isRequired,
  setSpot: PropTypes.func.isRequired,
  setSpotWithRegion: PropTypes.func.isRequired,
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
  spotList: PropTypes.arrayOf(
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
  spotListIsLoading: PropTypes.bool,
}

SideNav.defaultProps = {
  selectedRegion: null,
  spotListIsLoading: true,
}

export default SideNav
