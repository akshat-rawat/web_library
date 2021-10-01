
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const config = require("../config")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = config.weatherAPIKey;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const icon_url = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

            console.log(weatherData);
            res.setHeader('Content-type','text/html');
            res.write("<h3>The temperature of " + query + " is " + temp + " degree Celcius.</h3>");
            res.write("There is " + description);
            res.write("<br><img src="+icon_url+">");
            res.send();
        });
    });
});


app.listen(3000, function () {
   console.log("Server is Running"); 
});