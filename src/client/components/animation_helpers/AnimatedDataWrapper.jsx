import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

const mapNewStateToOldState = (oldState, newState) => {
  Object.keys(oldState).forEach(key => Object.assign(oldState[key], newState[key]))
  return oldState
}

const AnimatedDataWrapper = (dataProp, transitionDuration = 1200) => (ComposedComponent) => {
  class Composed extends Component {
    constructor(props) {
      super(props)
      const data = this.props[dataProp]
      this.state = Object.keys(data)
        .map(label => ({ [label]: data[label] }))
        .reduce((prev, curr) => ({ ...prev, ...curr }), {})
    }

    componentWillMount() {
      const data = this.props[dataProp]
      const dataKeys = this.props.dataKeys
      d3.select(this).transition().tween('attr.scale', null)
      d3
        .select(this)
        .transition()
        .duration(transitionDuration + 200)
        .ease(d3.easeBounceOut)
        .tween('attr.scale', () => {
          const barInterpolators = data.map((...args) => {
            const index = args[1]
            return dataKeys.map((key) => {
              const interpolator = d3.interpolateNumber(0, this.state[index][key])
              return { key, interpolator }
            })
          })
          return (t) => {
            const newState = barInterpolators
              .map(bar =>
                bar
                  .map(({ key, interpolator }) => ({ [key]: interpolator(t) }))
                  .reduce((result, currentObject) => {
                    Object.keys(currentObject).map((key) => {
                      if (Object.prototype.hasOwnProperty.call(currentObject, key)) {
                        result[key] = currentObject[key]
                      }
                      return null
                    })
                    return result
                  }, {}),
              )
              .reduce((newObject, value, index) => {
                newObject[index] = value
                return newObject
              }, {})
            const oldState = this.state
            const updatedState = mapNewStateToOldState(oldState, newState)
            this.setState(updatedState)
          }
        })
    }

    componentWillReceiveProps(nextProps) {
      const data = this.props[dataProp]
      const nextData = nextProps[dataProp]
      const dataKeys = this.props.dataKeys
      const dataUnchanged = Object.keys(data)
        .map(label => data[label] === nextData[label])
        .reduce((prev, curr) => prev && curr)
      if (dataUnchanged) {
        return
      }
      d3.select(this).transition().tween('attr.scale', null)
      d3
        .select(this)
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeBounceOut)
        .tween('attr.scale', () => {
          const barInterpolators = data.map((...args) => {
            const index = args[1]
            return dataKeys.map((key) => {
              const interpolator = d3.interpolateNumber(
                this.state[index][key],
                nextData[index][key],
              )
              return { key, interpolator }
            })
          })
          return (t) => {
            const newState = barInterpolators
              .map(bar =>
                bar
                  .map(({ key, interpolator }) => ({ [key]: interpolator(t) }))
                  .reduce((result, currentObject) => {
                    Object.keys(currentObject).map((key) => {
                      if (Object.prototype.hasOwnProperty.call(currentObject, key)) {
                        result[key] = currentObject[key]
                      }
                      return null
                    })
                    return result
                  }, {}),
              )
              .reduce((newObject, value, index) => {
                newObject[index] = value
                return newObject
              }, {})
            const oldState = this.state
            const updatedState = mapNewStateToOldState(oldState, newState)
            this.setState(updatedState)
          }
        })
    }

    render() {
      const { props, state } = this
      const newData = Object.keys(state).map(val => state[val])
      const newDataProps = { ...{ [dataProp]: newData } }
      const newProps = { ...props, ...newDataProps }
      return <ComposedComponent {...newProps} />
    }
  }

  Composed.propTypes = {
    dataKeys: PropTypes.instanceOf(Array).isRequired,
  }

  return Composed
}

AnimatedDataWrapper.propTypes = {
  date: PropTypes.instanceOf(Array).isRequired,
  forecast: PropTypes.instanceOf(Object).isRequired,
  maxSurf: PropTypes.number.isRequired,
  dataKeys: PropTypes.arrayOf(String).isRequired,
}

export default AnimatedDataWrapper
