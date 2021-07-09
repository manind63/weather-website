const request = require ('request');

const getWeather = ({latitude,longitude,location},callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=56598522acdd016d86d843794bf91fca&query=' +encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+''
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service '+ error,'','')
        } else if (body.error) {
            callback('Unable to find location','','')
        }else {
            console.log(location)
            callback('',`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} out. It feels like ${body.current.feelslike} out at ${body.location.name}. Humidity is at ${body.current.humidity}.`,location)
        }
    })
}

module.exports = getWeather