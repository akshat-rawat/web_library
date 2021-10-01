
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = [];
var workItems = [];

app.get("/", function (req, res) {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);
    res.render("list", {listTitle: day, newListItems: items});

});

app.get("/work", function (req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/", function (req, res) {
   let item = req.body.newItem; 

   if (req.body.list === "Work") {
       workItems.push(item);
       console.log(req.body.list);
       res.redirect("/work");
   } else {
    items.push(item);
    console.log(req.body.list);
    res.redirect("/");
   }
});

app.listen(3000, function () {
    console.log("Hello World!");
});