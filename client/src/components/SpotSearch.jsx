/* @flow */

import * as React from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'react-collapse'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'

import '../stylesheets/Button.css'

type Props = {
  placeholder: string,
  regions: Array<Object>,
  setRegion: Function,
  setSpotWithRegion: Function,
}

type State = {
  search?: string,
}

/*
Stateful container for the spot search which will handle the search itself and pass
the search value downward to any children, so that the logic can be used in multiple
places with any kind of layout
*/
class SpotSearch extends React.PureComponent<Props, State> {
  static defaultProps: Object
  constructor(props: Props) {
    super(props)
    this.state = {}

    this.setSearchValue = this.setSearchValue.bind(this)
    this.deboucedInputHandler = debounce(this.setSearchValue, 500)
    this.onChange = this.onChange.bind(this)
    this.performSearch = this.performSearch.bind(this)
  }

  onChange: Function = (event: Object) => {
    event.persist()
    this.deboucedInputHandler(event)
  }

  setSearchValue: Function = (event: Object) => {
    this.setState({
      search: event.target.value,
    })
  }

  performSearch: Function = (regions, search) => {
    const regionSearchResults = []
    let spotSearchResults = []
    regions.forEach(region => {
      if (region.name.toLowerCase().includes(search.toLowerCase())) regionSearchResults.push(region)

      const spotSearch = region.spots.filter(spot =>
        spot.name.toLowerCase().includes(search.toLowerCase())
      )
      spotSearchResults = spotSearchResults.concat([
        {
          region,
          spotSearchResults: spotSearch,
        }
      ])
    })

    return {
      regions: regionSearchResults,
      spots: spotSearchResults,
    }
  }

  deboucedInputHandler: Function

  render() {
    let searchResults = {}

    if (this.state.search) {
      searchResults = this.performSearch(this.props.regions, this.state.search)
    }

    return [
      <div key="search-container" className="search-bar">
        <div className="search-icon-container">
          <figure className="search-icon" />
        </div>
        <input
          className="search-input"
          placeholder={this.props.placeholder}
          onChange={e => this.onChange(e)}
        />
      </div>,
      <Collapse key="search-results" isOpened={!!this.state.search}>
        <div className="search-results" opened={this.state.search ? 'true' : 'false'}>
          <div className="region-results">
            {searchResults.regions &&
              searchResults.regions.length > 0 && (
                <div className="result-header">
                  <h3>Regions</h3>
                </div>
              )}
            {searchResults.regions &&
              searchResults.regions.length > 0 &&
              searchResults.regions.map(region => (
                <Link
                  to="/forecast"
                  key={`${region.name}`}
                  className={'region-result btn-hover-animation'}
                  role="button"
                  onClick={() => this.props.setRegion(region)}
                >
                  <h3 className={'result-name'}>{region.name}</h3>
                </Link>
              ))}
          </div>
          <div className="spot-results">
            {searchResults.spots &&
              searchResults.spots.length > 0 && (
                <div className="result-header">
                  <h3>Spots</h3>
                </div>
              )}
            {searchResults.spots &&
              searchResults.spots.map(region =>
                region.spotSearchResults.map(spot => (
                  <Link
                    to="/forecast"
                    key={`${spot.name}`}
                    className={'spot-result btn-hover-animation'}
                    role="button"
                    onClick={() => {
                      this.props.setSpotWithRegion(region.region, spot)
                    }}
                  >
                    <h3 className={'result-name'}>{spot.name}</h3>
                  </Link>
                ))
              )}
          </div>
        </div>
      </Collapse>
    ]
  }
}

SpotSearch.propTypes = {
  placeholder: PropTypes.string,
  regions: PropTypes.arrayOf(Object).isRequired,
  setSpotWithRegion: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
}

SpotSearch.defaultProps = {
  placeholder: 'Search...',
}

export default SpotSearch
