import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

const AnimatedCurtainWrapper = (
  curtainProp = 'curtain',
  dataProp = 'data',
  transitionDuration = 800
) => (ComposedComponent) => {
  class Composed extends Component {
    constructor(props) {
      super(props)
      const data = this.props
      // Create a base state based off the dataProp's keys and values
      this.state = Object.keys(data)
        .map(label => ({ [label]: data[label], }))
        .reduce((prev, curr) => ({ ...prev, ...curr, }), {})
    }

    /*
    When the component mounts, interpolate the endAngle of the Pie Chart to
    create a mounting animation. At each step of interpolation set the endAngle
    in the state to update the component.
    */
    componentDidMount() {
      d3
        .select(this)
        .transition()
        .duration(transitionDuration + 300)
        .ease(d3.easeLinear)
        .tween('attr.scale', () => {
          const interpolator = d3.interpolateNumber(0, this.props.view[0])
          return (t) => {
            const newState = interpolator(t)
            this.setState({
              [curtainProp]: newState,
            })
          }
        })
    }

    componentWillReceiveProps(nextProps) {
      const data = this.state.data
      const nextData = nextProps.data
      d3
        .select(this)
        .transition()
        .tween('attr.scale', null)
      d3
        .select(this)
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeBounceOut)
        .tween('attr.scale', () => {
          const dataInterpolators = data.map((...args) => {
            const index = args[1]
            const interpolator = d3.interpolateNumber(
              data[index][dataProp],
              nextData[index][dataProp]
            )
            return interpolator
          })
          return (t) => {
            const newState = dataInterpolators.map(interpolator => ({
              [dataProp]: interpolator(t),
            }))
            const oldData = this.state.data
            const updatedState = oldData.map((dataItem, index) => ({
              ...dataItem,
              ...newState[index],
            }))
            this.setState({
              ...this.state,
              data: updatedState,
            })
          }
        })
    }

    componentWillUnmount() {
      this.setState({})
    }

    /*
    The render function here takes care of merging the new and old state/props and
    then passing them down to the composed component to be rendered at every step
    of the animation
    */
    render() {
      const { props, state, } = this
      const newDataProps = { ...state, }
      const newProps = { ...props, ...newDataProps, }
      return <ComposedComponent {...newProps} />
    }
  }

  Composed.propTypes = {
    view: PropTypes.arrayOf(PropTypes.number).isRequired,
    data: PropTypes.instanceOf(Object).isRequired,
  }

  // Return the composed component
  return Composed
}

export default AnimatedCurtainWrapper
