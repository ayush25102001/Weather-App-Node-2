const express=require('express')
const path=require("path")
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const request=require('request')

//Define path for exprss config
const public=path.join(__dirname,'../public')     //dirname points to the folder in which the current fie is i.e app.js
const viewsPath=path.join(__dirname,'../templates/views')  //initially there was a compulsion to keep folder name as views but to rename it to tempalate this setup was made
const partialsPath=path.join(__dirname,'../templates/partials')
const app=express()

//Define static deirectory to serve 
app.use(express.static(public))  //express starts looking for matches to incoming request from public directory


//Setup the handlebars engine and views location
app.set('view engine','hbs')     //substitute ejs
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{    //homepage
    //res.send("hello")   This sends static content
      res.render('index',{
          title:"Weather app",
          name:"Ayush"          //templating(dynamic)
      })
})
app.get('/help',(req,res)=>{
    res.render('help',{title:'help page'})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"Weather app",
        name:"Ayush" 
    })  
})

app.get('/products',(req,res)=>{
    //console.log(req.query)   Prints the query part in the requested url(Basically return objects with queries as key value pairs)
    if(!req.query.search)
    {
        res.send({
            error:"Send the search query"
        })
    }else{                         //Its important to note that only one response can be made to the browser
        res.send({
            products:[]
        }) 
    }
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:"Address needs to be specified"
        })
    }else{
        geocode(req.query.address,(error,data={})=>{   //sending city name  //(error,{latitite,longitude,location}={}):destructured syntax
         if(error)                                     //Default parameter if no or invalid address was given     
        {
            res.send({
                error:error
            })
        }
       else
        {    //Got the latitude and longitude and passed it to the forecast to get the weather details
            forecast(data.latitude,data.longitude,(error,forecastdata)=>{
            if(error)
            {
                res.send({
                    error:error
                })
            }
            else
            {
                res.send({
                    address:req.query.address,
                    forecast:forecastdata,
                   
                })
            }
            })
        }
        })
    }
})
//Setting 404, must be at last so that all incoming requests(routes) are matched 
app.get('/help/*',(req,res)=>{   //something like help/ayush (non existing route)
    res.render('404',{
        title:"404",
        errorMessage:'Help page not found',
        name:"Ayush"
    })
})
app.get('*',(req,res)=>{
   res.render('404',{
       title:"404",
       errorMessage:'Page not found',
       name:"Ayush"
   })
})

app.listen(3000,()=>{
    console.log("server is up")
})