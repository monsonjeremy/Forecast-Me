/* @flow */

import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { childPropType } from '../types/proptypes'
import { SpotSearch } from './'

import '../stylesheets/SideNav.css'

type Props = {
  children: React.Node,
  regions: Array<Object>,
  setRegion: Function,
  setSpotWithRegion: Function,
}
/*
Simple stateless functional componentthat renders the navbar in the top level of the app so
that it is present in every section of the app.
It is connected to react-router, since that's what we use for routing.
*/
const SideNav = ({ children, regions, setRegion, setSpotWithRegion, }: Props) => (
  <section className="sidenav-container">
    <aside className="sidenav-aside">
      <div className="sidenav-title-container">
        <figure className="surfer-icon sidenav-title-icon" />
        <h1 className="sidenav-title">Forecast.it</h1>
      </div>
      <div className="sidenav-links-container">
        <div className="sidenav-links forecast-link">
          <Link className="sidenav-link" to="/forecast">
            FORECAST
          </Link>
        </div>
        <div className="sidenav-links info-link">
          <Link className="sidenav-link" to="/info">
            INFO
          </Link>{' '}
        </div>
      </div>
      <SpotSearch
        placeholder="Search for a spot or region..."
        regions={regions}
        setRegion={setRegion}
        setSpotWithRegion={setSpotWithRegion}
      />
      <section className="sidenav-container-items">{children}</section>
    </aside>
  </section>
)

SideNav.propTypes = {
  children: childPropType,
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
  setSpot: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
  setSpotWithRegion: PropTypes.func.isRequired,
}

SideNav.defaultProps = {
  children: null,
}

export default SideNav
