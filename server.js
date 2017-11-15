//require dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

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

  //make a request to SF Chronicle, for all its news headings
  request("http://www.sfchronicle.com/", function(err, res, html) {
    //load the html body from request into cheerio
    var $ = cheerio.load(html);

    //iterate through each element with a headline class
    $(".headline").each(function(index, element) {
      //save the headline, summary, URL, and image into variables
      var headline = $(element).children("a").text().trim();
      var summary = $(element).next("p").text().trim();
      var url = $(element).children("a").attr("href");
      var image = $(element).prev("div").children("a").children("img").attr("src");

      //if the element has all 4 variables assigned
      if (headline && summary && url /*&& image*/) {
        //console log to test
        console.log({
          headline : headline,
          summary : summary,
          url : url
          // image : image
        });  
      }
    });

  });
});

//this is the route to GET all articles from the database
app.get("/articles", function(req, res) {

});

//this is the route to GET a specific article by its ID, then populate any comment(s) associated with it
app.get("articles/:id", function(req, res) {

});

//this is the route to save a comment for a specific article
app.post("articles/:id", function(req, res) {

});

//this is the route to delete a note from an article
app.delete("articles/notes/:id", function(req, res) {

});

//this is the route to delete an article
app.delete("articles/:id", function(req, res) {

});

//start the server
app.listen(PORT, function() {
  console.log(`App running on port : ${PORT}!`);
})

