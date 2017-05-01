// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { APP_NAME } from '../shared/config'

type Props = {
  bsStyle: string,
  collapseOnSelect: boolean,
  fixedTop: boolean,
  fluid: boolean,
}

const SiteNavbar = ({ bsStyle, collapseOnSelect, fixedTop, fluid }: Props) =>
  <Navbar bsStyle={bsStyle} collapseOnSelect={collapseOnSelect} fixedTop={fixedTop} fluid={fluid}>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">{APP_NAME}</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="/forecast">Forecast</NavItem>
        <NavItem eventKey={2} href="/extras">Other stuff</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>


SiteNavbar.defaultProps = {
  bsStyle: 'default',
  collapseOnSelect: false,
  fixedTop: true,
  fluid: true,
}

SiteNavbar.propTypes = {
  bsStyle: PropTypes.string,
  collapseOnSelect: PropTypes.bool,
  fixedTop: PropTypes.bool,
  fluid: PropTypes.bool,
}

export default SiteNavbar
