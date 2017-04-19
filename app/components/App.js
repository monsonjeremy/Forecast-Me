import React from 'react'
import ForecastPage from './ForecastPage'

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <ForecastPage />
            </div>
        )
    }
}

module.exports = App