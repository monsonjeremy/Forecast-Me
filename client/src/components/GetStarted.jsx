/* @flow */
/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react'

import jjfclip from '../assets/jjfclip.mp4'
import '../stylesheets/GetStarted.css'

const GetStarted = () => (
  <section className="get-started-section">
    <video className="homepage-video" muted autoPlay loop src={jjfclip} type="video/mp4" />
    <div className="get-started-container container">
      <h1 className="section-title get-started-title">Select A Spot To Get Started</h1>
      <p className="section-subtitle copy-text get-started-copy">
        To get started you can use the sidebar to the left to select a spot or region and get a
        forecast. Search for a spot/region from the search bar or use the dropdowns to select an
        available spot/region. Thanks for using Forecast.it!
      </p>
    </div>
  </section>
)

export default GetStarted
