const request = require('request');

const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/874b63de22e97561b8a530feadf5b764/" + encodeURI(lat) + "," + encodeURI(long)
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined)
        }
        else if (body.error) {
            callback('Unable to search location', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    }
    )
};

module.exports = forecast;