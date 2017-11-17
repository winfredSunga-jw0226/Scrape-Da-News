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
var db = require("../models");

//use express' router method
var router = express.Router();

//this becomes the root route for /allnews
router.get("/", function(req, res) {
  //find all articles in the collection (Article)
  db.Article
  .find({saved : false})
  .then(function (dbArticle) {
    //send back all articles to the client
    res.render("index", {article : dbArticle, saved : false});
  })
  .catch(function(err) {
    res.json(err);
  })
});

//this is the GET route for scraping news details from the website
router.get("/scrape", function(req, res) {
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
        })
        .catch(function(err) {
          //If an error occurred, send the client an error message
          res.json(err);
        });
      }
    });
  });
});

//this is the route to save a specific article by its ID
router.put("/articles/:id", function(req, res) {
  //update the saved field to true
  db.Article
  .update(
    {_id : req.params.id},
    {saved : true}
  )
  .then(function(dbArticle) {
    res.json({_id : dbArticle._id});
  })
  .catch(function(err) {
    //If an error occurred, send the client an error message
    res.json(err);
  })
});

module.exports = router;




