/* @flow */

import React from 'react'

import '../stylesheets/GetStarted.css'

const GetStarted = () =>
  (<section className="get-started-section container-fluid">
    <div className="get-started-container container">
      <h1 className="section-title get-started-title">Select A Spot To Get Started</h1>
      <p className="section-subtitle copy-text get-started-copy">
        Open the spot selector and select your desired spot to get the forecast. Select a region for
        the regional aggregate forecast, or select a spot within a region to get a more specific
        forecast.
      </p>
    </div>
  </section>)

export default GetStarted
