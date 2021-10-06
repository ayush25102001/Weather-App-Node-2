const request=require('request')
const forecast=(lat,long,callback)=>
{
  const url='http://api.weatherstack.com/current?access_key=789ca121a96d10d3391a8716626ffb99&query='+lat+','+long+'&units=f'
  request({url:url,json:true},(error,response)=>{
    if(error){
        callback("Could not connect to destination server",undefined)
    }else if(response.body.error){
        callback("invalid input",undefined)
    }else{
        callback(undefined,response.body.current.weather_descriptions[0] +" current temp is "+response.body.current.temperature+" but it feels like "+response.body.current.feelslike)
    }
  })
}
module.exports=forecast
