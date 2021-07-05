const request = require ('request')

const getCorodinates = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFuam5kNjMiLCJhIjoiY2twdXRuZzlmMTNpYjJwdDg5ZXowOTdqbSJ9.-gQKfwfnGZIWn46PdkLudg&language=en&limit=1'
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect to mapbox!','');
        } else if (body.features.length === 0){
            callback('Unable to get the co-ordinates for given location, please try with different one!','')
        } else {
            const data ={
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name_en
            }
            console.log(data)
            callback('',data)
        }
    })
}

module.exports = getCorodinates