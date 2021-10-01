const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const config = require("../config");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
       
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const url = config.mailchimpURL;
    const options = {
        method: "POST",
        auth: config.mailchimpAuth
    }

    const request = https.request(url, options, function (response) {
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function (data) {
            console.log(JSON.parse(data));  
        });
    });

    request.write(jsonData);
    request.end();

});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

// unique id 6e2f2b0da9 
// API 2b3b333df1dc55438296ddd2a4e1ca1b-us7