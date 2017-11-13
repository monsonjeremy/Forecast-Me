import React from 'react'
import '../stylesheets/Loader.css'

const Loader = () => (
  <div className="loader-container">
    <div className="loader">
      <ul className="hexagon-container">
        <li className="hexagon hex_1" />
        <li className="hexagon hex_2" />
        <li className="hexagon hex_3" />
        <li className="hexagon hex_4" />
        <li className="hexagon hex_5" />
        <li className="hexagon hex_6" />
        <li className="hexagon hex_7" />
      </ul>
    </div>
  </div>
)
export default Loader
