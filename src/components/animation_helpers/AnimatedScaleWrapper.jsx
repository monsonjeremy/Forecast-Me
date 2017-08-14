import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

const AnimatedScaleWrapper = (scaleProps = [], transitionDuration = 300) => ComposedComponent =>
  class extends Component {
    constructor(props) {
      super(props)
      this.state = scaleProps
        .map((scaleProp) => {
          const scale = this.props[scaleProp]
          const [domainMin, domainMax] = scale.domain()
          return {
            [`${scaleProp}Min`]: domainMin,
            [`${scaleProp}Max`]: domainMax,
          }
        })
        .reduce((prev, curr) => ({ ...prev, ...curr, }), {})
    }

    componentWillReceiveProps(nextProps) {
      const scalesUnchanged = scaleProps
        .map((scaleProp) => {
          const [nextDomainMin, nextDomainMax] = nextProps[scaleProp].domain()
          const [domainMin, domainMax] = this.props[scaleProp].domain()
          return nextDomainMin === domainMin && nextDomainMax === domainMax
        })
        .reduce((prev, curr) => curr && prev, true)
      if (scalesUnchanged) {
        return
      }
      d3.select(this).transition().tween('attr.scale', null)
      d3
        .select(this)
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeLinear)
        .tween('attr.scale', () => {
          const interpolators = scaleProps.map((scaleProp) => {
            const [nextDomainMin, nextDomainMax] = nextProps[scaleProp].domain()
            const minInterpolator = d3.interpolateNumber(
              this.state[`${scaleProp}Min`],
              nextDomainMin
            )
            const maxInterpolator = d3.interpolateNumber(
              this.state[`${scaleProp}Max`],
              nextDomainMax
            )
            return { scaleProp, minInterpolator, maxInterpolator, }
          })
          return (t) => {
            const newState = interpolators
              .map(({ scaleProp, minInterpolator, maxInterpolator, }) => ({
                [`${scaleProp}Min`]: minInterpolator(t),
                [`${scaleProp}Max`]: maxInterpolator(t),
              }))
              .reduce((prev, curr) => ({ ...prev, ...curr, }), {})
            this.setState(newState)
          }
        })
    }

    render() {
      const { props, state, } = this
      const newScaleProps = scaleProps
        .map((scaleProp) => {
          const scale = props[scaleProp]
          const domainMin = state[`${scaleProp}Min`]
          const domainMax = state[`${scaleProp}Max`]
          const newScale = scale.copy()
          newScale.domain([domainMin, domainMax])
          return {
            [scaleProp]: newScale,
          }
        })
        .reduce((prev, curr) => ({ ...prev, ...curr, }), {})
      const newProps = { ...props, ...newScaleProps, }
      return <ComposedComponent {...newProps} />
    }
  }

AnimatedScaleWrapper.PropType = {
  scaleProps: PropTypes.array.isRequired,
  transitionDuration: PropTypes.number,
}

export default AnimatedScaleWrapper
