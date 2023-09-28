const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/",function(req,res){


    const query = req.body.cityName;
    const apiId = [YOUR API ID HERE];
    const airQuality = "yes";
    const url = "https://api.weatherapi.com/v1/current.json?key="+apiId+"&q="+query+"&aqi="+airQuality+".";
        
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatData = JSON.parse(data);
            const temp = weatData.current.temp_c;
            const condition = weatData.current.condition.text;


            const icon = weatData.current.condition.icon;
            const imageUrl =  "//cdn.weatherapi.com/weather/64x64/day/116.png";

            res.write("<p>the weather condition is currently " +condition +" .</p> ");
            res.write("<h1> The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
            res.write("<img src="+imageUrl+ ">");
            res.send();
        });
    
    });
});
    

app.listen(3000,function(){
    console.log("server has started");
});