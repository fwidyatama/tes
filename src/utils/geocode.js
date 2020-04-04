const request = require('request');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(address) + ".json?access_token=pk.eyJ1IjoiZndpZHlhdGFtYSIsImEiOiJjazhhM3VyMjQwNHE4M2dvOXhqeXJ0NTN5In0.cNHN5NmCaP8TfmdnAfpAew&limit=1"

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Cannot Connect to service', undefined);
        }
        else if (body.features.length === 0) {
            callback('Cannot find location', undefined);
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode;