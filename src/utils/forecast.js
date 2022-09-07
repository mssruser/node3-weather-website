const request = require('postman-request');

const fnForecast = (location_coords, callbackError, callbackSuccess) => {

    const {lat, lon} = location_coords
    const weather_url = 'http://api.weatherstack.com/current?access_key=25d4ec7c38803f4d6c08e95b03783db5&query='+lon+','+lat
    request({url:weather_url, json:true}, (error, response, body) => {

        if (error) {
            callbackError(error)
        } else if (body.error) {
            callbackError('error processing weather information');
        }
        else {
            const {temperature, precip, humidity, feelslike} = body.current
            console.log('It is currently: ',temperature, ' degrees and % rain: ', precip) 
            callbackSuccess({temperature, precip, location: location_coords.location, humidity, feelslike})
        }                
    });
}

module.exports = fnForecast