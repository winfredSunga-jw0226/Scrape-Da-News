//require dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var methodOverride = require("method-override");


//require our scraping tools
var request = require("request");
var cheerio = require("cheerio");

//require all models
var db = require("./models");

//assign a port for our app
var PORT = process.env.PORT || 8800

//initialize Express
var app = express();

//set up Handlebars for our app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//configure our middleware
// Use morgan logger for logging requests
app.use(logger("dev"));

// override all PUT and DELETE methods with POST 
app.use(methodOverride('_method'))

//we'll use body parser for handling form submissions
app.use(bodyParser.urlencoded({extended : false}));

//we'll use express.static to server the public folder as a static strategy
app.use(express.static("public"));

//set mongoose to leverage built-in JS ES6 Promises
mongoose.Promise = Promise;
//connect to Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlines", {
  useMongoClient : true
});


/*************
 == ROUTING ==
*************/
//import routes and give the server access to them
var allNewsRoutes = require("./routes/all-news-routes.js");
var savedNewsRoutes = require("./routes/saved-news-routes.js")

//listen for a GET request to the root URL
app.get("/", function(req, res) {
  //redirect to the /allnews route
  res.redirect("/allnews");
});

//use and set the root for all routes
app.use("/allnews", allNewsRoutes);
app.use("/savednews", savedNewsRoutes);

//start the server
app.listen(PORT, function() {
  console.log(`App running on port : ${PORT}!`);
});

