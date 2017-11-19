import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class WelcomeMessage extends PureComponent {
  render() {
    return (
      <section className="welcome-section text-center section-gray-background container-fluid">
        <div className="close-btn-container">
          <div className="close-btn" role="button" onClick={() => this.props.closeClick()}>
            ✖
          </div>
        </div>
        <div className="welcome-message container">
          <div className="welcome-title-container section-title">
            <h1 className="welcome-title section-title">Welcome to Forecast Me</h1>
            <p className="welcome-subtitle section-subtitle copy-text">
              Thanks for checking out my surf forecasting site. This is a passion project that
              I&apos;ve been working on building. Currently the app is built with a React/Redux
              front-end and a NodeJS/Express/Redis/PostgreSQL backend. I&apos;ll be working on
              adding features as soon as I can. See the <a href="/info">about</a> section for
              inquiries, contact information, or more information about app itself.
            </p>
          </div>
          <div className="welcome-content-container">
            <div className="triple-col">
              <figure className="surfer-icon subsection-icon" />
              <h3 className="section-header">Reliable</h3>
              <p className="section-subtitle copy-text content-subsection">
                This project is pulling data from <a href="https://surfline.com">Surfline</a>. This
                provides a reliable and accurate forecast. All credit goes to Surfline and Spitcast
                for the data.
              </p>
            </div>
            <div className="triple-col">
              <figure className="github-icon subsection-icon" />
              <h3 className="section-header">Open-Source</h3>
              <p className="section-subtitle copy-text content-subsection">
                The best part is the code is{' '}
                <a href="https://github.com/monsonjeremy/Forecast-Me">open-source</a>. That means
                you can see how it&apos;s made, contribute if you wish to, and even make sure
                it&apos;s not snooping on you (I promise it isn&apos;t).
              </p>
            </div>
            <div className="triple-col">
              <figure className="thumbsup-icon subsection-icon" />
              <h3 className="section-header">Simple</h3>
              <p className="section-subtitle copy-text content-subsection">
                No ads or distracting content, no shameless promotions, and no opinion pieces that
                you aren&apos;t here for. Just plain and simple surf forecast information with a
                simple and elegant UI. A clutter free way to figure out where you want to surf.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

WelcomeMessage.propTypes = {
  closeClick: PropTypes.func.isRequired,
}
export default WelcomeMessage
