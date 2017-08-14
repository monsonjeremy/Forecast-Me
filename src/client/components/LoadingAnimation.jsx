import React from 'react'

const LoadingAnimation = () =>
  (<div className="forecast-container container-fluid">
    <div className="text-center row">
      <div className="wave-wrapper col-xs-12">
        <h1 className="loading-text">LOADING...</h1>
        <div className="wave" />
      </div>
    </div>
  </div>)

export default LoadingAnimation
