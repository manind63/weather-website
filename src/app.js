const path = require('path');
const express = require('express');
const hbs = require('hbs');
// const weatherApp = require('../../weather-app/app.js').weather
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/getWeather.js')
const app = express();

//Define paths for express config.
const PublicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
// Set up handle bar engine and views path.
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(PublicDirPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        message: "Site to get your weather info in a click!",
        name: "Manjunath Kapu"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: "Manjunath Kapu"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: "This is where you get all the help!",
        title: 'Help',
        name: 'Manjunath Kapu'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address;
    geocode(address,(error,data)=>{
        if(error){
           return res.send({
                error: 'Unable to find the address!'
            })
        }else {
            forecast(data,(error,data,location)=>{
                if (error){
                    return res.send({
                        error: 'Unable to find the weather info!'
                    })
                } else {
                    const response  = {
                        forecast: data,
                        address: req.query.address,
                        location:location
                    }
                    res.send(response)
                }
               
            })
        }
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message: 'Help article not found',
        name: 'Manjunath Kapu'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        message: 'Page not found',
        name: 'Manjunath Kapu'
    })
})


app.listen(3000,()=>{
    console.log('Server is up and listening on port 3000!')
})