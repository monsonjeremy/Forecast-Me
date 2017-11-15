import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import _ from 'lodash'

/*
  Helper function for creating the mount animation interpolators
  when the prop to interpolate is found in the data array
*/
const createMountInterpolatorDataProp = dataSet =>
  dataSet.data.map(datum => {
    // Use the data key(s) given for the data set to create interpolators
    // If they aren't defined, use the keys given in keysToInterp
    if (dataSet.mountInterpKeys === undefined) {
      dataSet.mountInterpKeys = dataSet.keysToInterp
    }
    return dataSet.mountInterpKeys.map(key => {
      // Create the interpolator and associate it to the accessor key
      const interpolator = d3.interpolateNumber(0, datum[key])
      return { key, interpolator, }
    })
  })

/*
  Helper function for creating the interpolators when
  the prop to interpolate is found in the data array
*/
const createInterpolatorDataProp = (dataSet, nextDataSet) => {
  // if there are less data points in the next data set then handle the extra data gracefully
  if (dataSet.data.length > nextDataSet.data.length) {
    // Map data set as normal
    return dataSet.data.map((datum, datumIndex) =>
      dataSet.keysToInterp
        .map((key, index) => {
          // If the next dataset doesn't have data at index just return null
          if (nextDataSet.data[datumIndex] !== undefined) {
            // In case the next data uses different keys, use those keys for interpolation
            const nextPropsDataKey = nextDataSet.keysToInterp[index]
            return {
              key,
              interpolator: d3.interpolateNumber(
                datum[key],
                nextDataSet.data[datumIndex][nextPropsDataKey]
              ),
            }
          }
          // Else return interpolator as normal
          return null
        })
        .filter(interpByKey => interpByKey !== null)
    )
  }
  if (dataSet.data.length < nextDataSet.data.length) {
    // Map next data since it has more items
    return nextDataSet.data.map((datum, datumIndex) =>
      dataSet.keysToInterp.map((key, index) => {
        // In case the next data uses different keys, use those keys for interpolation
        const nextDataSetKey = nextDataSet.keysToInterp[index]
        // If the old dataset doesn't have data at index, create a static interpolator
        if (dataSet.data[datumIndex] === undefined) {
          // this will just return the same value at every elapsed time point
          return {
            key,
            interpolator: d3.interpolateNumber(datum[nextDataSetKey], datum[nextDataSetKey]),
          }
        }
        // Else return interpolator as normal
        const interpolator = d3.interpolateNumber(
          dataSet.data[datumIndex][key],
          datum[nextDataSetKey]
        )
        return {
          key,
          interpolator,
        }
      })
    )
  }
  return dataSet.data.map((datum, datumIndex) =>
    dataSet.keysToInterp.map((key, index) => {
      // In case the next data uses different keys, use those keys for interpolation
      const nextDataSetKey = nextDataSet.keysToInterp[index]
      // Create the interpolator and associate it to the accessor key
      const interpolator = d3.interpolateNumber(
        datum[key],
        nextDataSet.data[datumIndex][nextDataSetKey]
      )
      return { key, interpolator, }
    })
  )
}

/*
  DATA SHOULD BE STRUCTURED AS FOLLOWS:
  graphName and keyName would be replaced with respective names
  dataSets: {
    set1: {
      data: [
        {keyName: keyValue}
      ],
      keysToInterp: Array<String>
      mountInterpKeys: Defaults to keysToInterp
      mountKeyIsInData: boolean
    }
  }

  a mounting animation key can either be in data (if it is a related to the data and
  is used for drawing bars/line/etc...). If it is outside the data in the top level
  data set object, mountKeyIsInData should be set to false

  For the time being this HOC will be quite opinionated on the structure of the data,
  since it's not an open source animation handler that other projects are using. I
  think it would be valuable to make it more extensible however, like being able to pass
  data keys as a string instead of an array of 1 string. It's not a priority however due
  to the fact that this project strucutres the data the same way.
*/
const DataInterpolationWrapper = (transitionDuration = 400) => ComposedComponent => {
  class Composed extends Component {
    constructor(props) {
      super(props)

      this.state = this.props.dataSets

      this.doInterpolation = this.doInterpolation.bind(this)
      this.mountPropInterpolation = this.mountPropInterpolation.bind(this)
      this.newPropInterpolation = this.newPropInterpolation.bind(this)
    }

    componentWillMount() {
      const data = this.props.dataSets
      // Use D3 Transition function to interpolate the data
      d3
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeLinear)
        .tween('attr.scale', () => this.mountPropInterpolation(data))
    }

    componentWillReceiveProps(newProps) {
      const data = this.props.dataSets

      // Use D3 Transition function to interpolate the data
      d3
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeLinear)
        .tween('attr.scale', () => this.newPropInterpolation(data, newProps.dataSets))
    }

    /*
    Function for using the time elapsed to get the data values for
    current step of the animation and update the state with it
    */
    doInterpolation(timeElapsed, dataSets, nextProps = null) {
      // Return the function used by tween to update the value at each step of transition
      // Iterate the data sets to get to nested interpolators

      const interpolatedState = dataSets.map(dataSet =>
        // iterate the array of arrays containing the interpolators
        dataSet.map(datum =>
          datum
            // Destructure and then create object with interpolated value assigned to the key
            .map(({ key, interpolator, }) => ({
              [key]: interpolator(timeElapsed),
            }))
            // Map returns array of objects, use reduce to merge objects into single object
            // This makes it easier to merge the new values with old ones later :D
            .reduce(
              (accumulator, currentObject) => ({
                ...accumulator,
                ...currentObject,
              }),
              {}
            )
        )
      )

      const oldState = this.state
      const updatedState = Object.keys(oldState)
        .map((dataSetKey, dataSetIndex) => {
          const newDataSetData = oldState[dataSetKey].data
            .map((datum, dataIndex) => {
              if (nextProps !== null) {
                return {
                  ...nextProps[dataSetKey].data[dataIndex],
                  ...interpolatedState[dataSetIndex][dataIndex],
                }
              }
              return {
                ...datum,
                ...interpolatedState[dataSetIndex][dataIndex],
              }
            })
            .filter(dataEntry => !_.isEmpty(dataEntry))

          if (nextProps !== null) {
            return {
              key: dataSetKey,
              newDataSetObject: {
                ...nextProps[dataSetKey],
                data: newDataSetData,
              },
            }
          }
          return {
            key: dataSetKey,
            newDataSetObject: {
              ...oldState[dataSetKey],
              data: newDataSetData,
            },
          }
        })
        .reduce((newObject, currentValue) => {
          const { key, newDataSetObject, } = currentValue
          newObject[key] = newDataSetObject
          return newObject
        }, {})
      this.setState(updatedState)
    }

    mountPropInterpolation(data) {
      // start by iterating the different data sets (tide, surf, etc...)
      const dataSets = Object.keys(data).map(dataSetKey =>
        createMountInterpolatorDataProp(data[dataSetKey])
      )
      // Return the function used by tween to update the value at each step of transition
      return timeElapsed => this.doInterpolation(timeElapsed, dataSets)
    }

    newPropInterpolation(data, nextProps) {
      // start by iterating the different data sets (tide, surf, etc...)
      const dataSets = Object.keys(data).map(dataSetKey =>
        createInterpolatorDataProp(data[dataSetKey], nextProps[dataSetKey])
      )
      // Return the function used by tween to update the value at each step of transition
      return timeElapsed => this.doInterpolation(timeElapsed, dataSets, nextProps)
    }

    render() {
      const { props, state, } = this
      const newProps = {
        ...props,
        dataSets: state,
      }

      // const newData = Object.keys(state).map(val => state[val])
      // const newDataProps = { ...{ [dataProp]: newData, }, }
      // const newProps = { ...props, ...newDataProps, }
      return <ComposedComponent {...newProps} />
    }
  }

  /*
  The structure of the object is kind of ambiguous and can change
  It makes more sense to make sure it's an object. If it's not
  then there is a pretty frickin big problem...
*/
  Composed.propTypes = {
    dataSets: PropTypes.instanceOf(Object).isRequired,
  }

  return Composed
}

DataInterpolationWrapper.propTypes = {}

export default DataInterpolationWrapper
