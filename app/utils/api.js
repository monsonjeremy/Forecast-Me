import axios from 'axios'

module.exports = {
    fetchSpot: function (spotId) {
        var encodedURI = window.encodeURI('http://api.surfline.com/v1/forecasts/' + spotId + 
        '?resources=surf,analysis&days=6&getAllSpots=false&units=e&interpolate=false&showOptimal=false')

        return axios.get(encodedURI).then( function (response) {
            return response.data.Surf
        })
    }
}