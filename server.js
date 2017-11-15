//require dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");


//require our scraping tools
var request = require("request");
var cheerio = require("cheerio");

//require all models
var db = require("./models");

//assign a port for our app
var PORT = 8800;

//initialize Express
var app = express();

//configure our middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
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
 == ROUTES ==
*************/

//this is the GET route for scraping news details from the website
app.get("/scrape", function(req, res) {
  //create index on Article model

  var rootURL = "http://www.sfchronicle.com";

  //make a request to SF Chronicle, for all its news headings
  request(rootURL, function(err, response, html) {
    //load the html body from request into cheerio
    var $ = cheerio.load(html);

    //iterate through each element with a headline class
    $(".headline").each(function(index, element) {
      //create an empty result object which we'll populate later
      var result = {};

      //create the headline, summary, URL, and saved as key value pairs
      result.headline = $(element).children("a").text().trim();
      result.summary = $(element).next("p").text().trim();
      result.url = rootURL + $(element).children("a").attr("href");
      //result.saved = false;
      
      //if the element has all 3 variables assigned
      if (result.headline && result.summary && result.url) {
        //insert into mongodb
        db.Article
        .insertMany(result)
        .then(function(dbArticle) {
          //send message to the client after a succesful scrape
          res.send("Scrape complete!");
          //res.json(dbArticle);
        })
        .catch(function(err) {
          //If an error occurred, send the client an error message
          res.json(err);
        });
        //res.send("Scrape complete!");
      }
    });
  });
});

//this is the route to GET all articles from the database
app.get("/articles", function(req, res) {

});

//this is the route to GET a specific article by its ID
app.get("articles/:id", function(req, res) {

});

//this is the route to delete an article
app.delete("articles/:id", function(req, res) {

});

//this is the route to save a comment for a specific article
app.post("comments/:id", function(req, res) {

});

//this is the show all comments for a specific article
app.get("articles/:id/comments", function(req, res) {

});


//this is the route to delete a comment from an article
app.delete("articles/notes/:id", function(req, res) {

});


//start the server
app.listen(PORT, function() {
  console.log(`App running on port : ${PORT}!`);
})

