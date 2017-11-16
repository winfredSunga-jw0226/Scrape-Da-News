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

//listen for a GET request for the route of /savednews, which becomes the root
router.get("/", function(req, res) {
  console.log("I am in the root route of saved news!");
  db.Article.find({saved : true})
  .then(function(dbArticle) {
    res.render("saved", {article : dbArticle, saved : true});
  })
  .catch(function(err) {
    res.json(err);
  });
});

//this is the route to save a comment for a specific article
router.post("comments/:id", function(req, res) {

});

//this is the show all comments for a specific article
router.get("articles/:id/comments", function(req, res) {

});


//this is the route to delete a comment from an article
router.delete("articles/notes/:id", function(req, res) {

});

//this is the route to unsave an article
router.put("/articles/:id", function(req, res) {
  console.log("I am going to unsave this article!!!");
  db.Article
  .update(
    {_id : req.params.id},
    {saved : false}
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