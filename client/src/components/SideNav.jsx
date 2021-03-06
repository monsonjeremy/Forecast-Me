/* @flow */

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { SpotSearch, DropdownSelector, Loader } from './'
import { version } from '../../package.json'

import '../stylesheets/SideNav.css'

type Props = {
  children: Node,
  fetchSpotList: Function,
  setRegion: Function,
  setSpotWithRegion: Function,
  setSpot: Function,
  selectedRegion: {
    name: string,
    id: string,
    spots: Array<{
      name: string,
      id: string,
    }>,
  },
  spotList: Array<{
    name: string,
    id: string,
    spots: Array<{
      name: string,
      id: string,
    }>,
  }>,
  spotListIsLoading: boolean,
  history: Object,
}

class SideNav extends PureComponent<Props> {
  static defaultProps: Object

  componentWillMount() {
    this.props.fetchSpotList()
  }
  render() {
    const {
      setRegion,
      setSpotWithRegion,
      selectedRegion,
      spotList,
      setSpot,
      spotListIsLoading,
      history,
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
        {spotListIsLoading && <Loader className="side-nav-loader" />}
        <aside className="sidenav-aside">
          <div className="sidenav-title-container">
            <figure className="surfer-icon sidenav-title-icon" />
            <h1 className="sidenav-title">ForecastMe</h1>
          </div>
          <div className="sidenav-links-container">
            <Link to="/forecast" className="sidenav-links forecast-link">
              <div role="link" onClick={() => history.push('/forecast')} className="sidenav-link">
                FORECAST
              </div>
            </Link>
            <Link to="/info" className="sidenav-links info-link">
              <div role="link" onClick={() => history.push('/forecast')} className="sidenav-link">
                INFO
              </div>
            </Link>
          </div>
          <SpotSearch
            placeholder="Search for a spot or region..."
            regions={spotList}
            setRegion={setRegion}
            setSpotWithRegion={setSpotWithRegion}
          />
          <section className="sidenav-container-items">
            <DropdownSelector key={'region-dropdown'} {...regionDropdownProps} />
            <DropdownSelector key={'spot-dropdown'} {...spotDropdownProps} />
          </section>
          <section className="app-version">
            <h3>Version: {version}</h3>
          </section>
        </aside>
      </section>
    )
  }
}

SideNav.propTypes = {
  fetchSpotList: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
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
