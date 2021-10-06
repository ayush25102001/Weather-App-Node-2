const request=require("request")
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYXl1c2gyNTEwMjAwMSIsImEiOiJja3U0Y2ltMGwxaG96MnJ0OTlhejY2dGpmIn0.RmTxgt9oAKlXIahXTjZ3WQ"
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Could not connect to destination server",undefined)
        }else if(response.body.features.length===0){
            callback("invalid input",undefined)
        }else{
            callback(undefined,{
                                latitude: response.body.features[0].center[1],
                                longitude: response.body.features[0].center[0],
                                place: response.body.features[0].place_name 
                               }
                    )
        }
    })
}
module.exports=geocode