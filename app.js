const express = require('express');
const app = express()
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./src/utils/geocode');
const forecast = require('./src/utils/forecast');
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())



//define path for express config
const publicDirectoryPath = path.join(__dirname, '/public')
const viewPath = path.join(__dirname, '/templates/views')
const partialPath = path.join(__dirname, '/templates/partials')

//handlebar setup
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Farid Widyatama'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Farid Widyatama'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Farid Widyatama'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address inputed"
        })
    }
    geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Farid Widyatama',
        errorMessage: 'Help not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Farid Widyatama',
        errorMessage: 'Page not found'
    });
})


app.listen(port, () => {
    console.log('Server is up on port'+port)
})