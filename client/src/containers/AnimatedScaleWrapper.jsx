import React, { Component } from 'react'
import * as d3 from 'd3'

const AnimatedScaleWrapper = (scaleProps = [], transitionDuration = 400) => ComposedComponent =>
  class extends Component {
    constructor(props) {
      super(props)
      this.state = scaleProps
        .map(scaleProp => {
          const scale = this.props[scaleProp]
          const domain = scale.domain()
          return {
            [`${scaleProp}Domain`]: domain,
          }
        })
        .reduce((prev, curr) => ({ ...prev, ...curr, }), {})
    }

    componentWillReceiveProps(nextProps) {
      const scalesUnchanged = scaleProps
        .map(scaleProp => {
          const nextDomain = nextProps[scaleProp].domain()
          const currDomain = this.props[scaleProp].domain()
          if (nextDomain === currDomain) return true
          if (nextDomain == null || currDomain == null) return false
          if (nextDomain.length !== currDomain.length) return false

          for (let i = 0; i < nextDomain.length; i += 1) {
            if (nextDomain[i] !== currDomain[i]) return false
          }
          return true
        })
        .reduce((prev, curr) => curr && prev, true)
      if (scalesUnchanged) {
        return
      }
      d3
        .select(this)
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeLinear)
        .tween('attr.scale', () => {
          const interpolators = scaleProps.map(scaleProp => {
            const nextDomain = nextProps[scaleProp].domain()
            const domainInterpolator = d3.interpolateArray(
              this.state[`${scaleProp}Domain`],
              nextDomain
            )
            return { scaleProp, domainInterpolator, }
          })
          return t => {
            const newState = interpolators
              .map(({ scaleProp, domainInterpolator, }) => ({
                [`${scaleProp}Domain`]: domainInterpolator(t),
              }))
              .reduce((prev, curr) => ({ ...prev, ...curr, }), {})
            this.setState(newState)
          }
        })
    }

    render() {
      const { props, state, } = this
      const newScaleProps = scaleProps
        .map(scaleProp => {
          const scale = props[scaleProp]
          const domain = state[`${scaleProp}Domain`]
          const newScale = scale.copy()
          newScale.domain(domain)
          return {
            [scaleProp]: newScale,
          }
        })
        .reduce((prev, curr) => ({ ...prev, ...curr, }), {})
      const newProps = { ...props, ...newScaleProps, }
      return <ComposedComponent {...newProps} />
    }
  }

export default AnimatedScaleWrapper
