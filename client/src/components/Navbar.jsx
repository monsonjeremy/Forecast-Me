/* @flow */

import React from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/Navbar.css'

/*
Simple stateless functional componentthat renders the navbar in the top level of the app so
that it is present in every section of the app.
It is connected to react-router, since that's what we use for routing.
*/
const Navbar = () =>
  (<nav className="navbar navbar-default navbar-static-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand">Forecast Me</a>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/forecast">FORECAST</Link>
          </li>
          <li>
            <Link to="/info">INFO</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>)

export default Navbar
