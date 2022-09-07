const request = require('postman-request');


const fnGeocode = (geotext, callbackError, callbackSuccess)=> {

    const geocoding_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(geotext)+'.json?access_token=pk.eyJ1IjoibHV4c3BhY2UiLCJhIjoiY2tnajY1dms2MDZnejM1bnZ1OHg5MjcyMyJ9.xjIIq2rCBJMqmveA6FuLDw&limit=1'
    
    request( {url:geocoding_url,json: true}, (error, {body}) => {
        
        if (error) {
            callbackError(error)
        } else if (body.features.length==0) {
            callbackError('Text was not able to be geocoded')            

        } else {

            const {center, place_name="Somewhere"} = body.features[0]
            const lat = center[1]
            const lon = center[0]     
            const location_coords = {lat, lon, location:place_name}
            
            console.log('Text geocoded as lat: ', location_coords.lat, 'long: ', location_coords.lon, 'Location: ', location_coords.location)
            
            callbackSuccess(location_coords)
        }
    })
}

module.exports = fnGeocode