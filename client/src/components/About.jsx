import React from 'react'
import '../stylesheets/About.css'

export default () => (
  <section className="about-section text-center section-gray-background">
    <div className="about-info">
      <div className="about-thankyou-container">
        <div className="about-title-container section-title">
          <h1 className="about-title section-title">About the site</h1>
          <p className="about-subtitle section-subtitle copy-text">
            The site is powered mainly by <a href="https://surfline.com">Surfline</a>. Buoy data is
            pulled every 6 hours from the <a href="https://ndbc.nooa.gov">NDBC</a> API. One
            important piece of information is that I am still researching and learning about parsing
            the buoy data, so right now only the dominant swell on the buoy is being displayed. This
            can potentially be misleading regarding the real conditions.
            <br />
            <br />
            This project is a huge hobby project for me and I hope you enjoy it. I will be adding
            more features and pages as time permits. The next feature to be added is the ability for
            anyone to add their region and spots as long as they are on surfline. I will also be
            adding forecasts from other websites at some point.
          </p>
        </div>
        <div className="thanks-content-container section-title">
          <h1 className="thanks-title section-title">Thanks for visiting the site!</h1>
          <p className="thanks-subtitle section-subtitle copy-text">
            I really hope you enjoyed the site, and if you have any questions/comments/concerns
            please feel free to reach me at any of the social share icons below! I will be happy to
            help with anything.
          </p>
        </div>
        <div className="social-share-container">
          <a href="https://github.com/monsonjeremy/Forecast-Me" className="github-link">
            <figure className="github-icon social-share-icon" />
          </a>
          <a
            href="mailto:monson.jeremy@gmail.com?Subject=Forecast-Me: Your Subject Here"
            className="email-link"
          >
            <figure className="email-icon social-share-icon" />
          </a>
          <a href="https://www.linkedin.com/in/monsonjeremy/" className="linkedin-link">
            <figure className="linkedin-icon social-share-icon" />
          </a>
        </div>
      </div>
    </div>
  </section>
)
