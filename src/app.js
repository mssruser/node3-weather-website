const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

//setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

//setup static directory to set
app.use(express.static(publicDirPath))

app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Miguel'
    })
})


app.get('/weather', (req, res)=> {

    console.log(req.query)
    
    const fnPrintError = (error) => {
        console.error('Error on Http request: ', error)
        res.contentType('application/json')
        res.status(500).send({error})
    }


    if (!req.query.address) {
        res.contentType('application/json')
        res.status(500).send({error: 'address param is mandatory'})
    } 
    else {
        
        const fnSucess = (forecast) => {
            res.contentType('application/json').send(forecast)
        }
        
        geocode(req.query.address, 
                fnPrintError, 
                (coord)=> { forecast(coord, fnPrintError, fnSucess)})        
    }
    
})


app.get('/products', (req, res)=> {

    console.log(req.query)

    if (!req.query.search) {
        res.send({error:'search term is mandatory'})

    } else {
        res.contentType('application/json')
        res.send({products:[]})
    }
    
})

app.get('/about', (req, res)=> {
    res.render('about',{
        title:'About',
        name: 'Miguel'
    })
})

app.get('/help', (req, res)=> {
    res.render('help',{        
        title:'Help',
        name: 'Miguel',
        helpText:'This is a help text'
    })
})

app.get('/help/*', (req,res)=> {
    res.render('error',{        
        title:'Help page error',
        errorCode:'403',
        errorDescr: 'Help page not found',
        name: 'Miguel'     
    })
})

//Match anything else
app.get('*', (req,res)=> {
    res.render('error',{        
        title:'General error',
        errorCode:'404',
        errorDescr: 'Page not found',
        name: 'Miguel'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})
