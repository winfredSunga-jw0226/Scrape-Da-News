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
  db.Article.find({saved : true})
  .then(function(dbArticle) {
    res.render("saved", {article : dbArticle, saved : true});
  })
  .catch(function(err) {
    res.json(err);
  });
});

//this is the route to save a comment for a specific article
router.post("/articles/:id/comments", function(req, res) {
  console.log(req.body);
  db.Comment
    .create(req.body)
    .then(function(dbComment) {
      //find the associated article id in Article model and update it's comment field, and return the updated Article so that it shows the updated information
      return db.Article.findOneAndUpdate({_id : req.params.id}, { $push : { comments : dbComment._id }}, {new : true});
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//this is the show all comments for a specific article
router.get("/articles/:id/comments", function(req, res) {
  console.log("I am in the show article comments!");
  //find the one article in the Article collection
  db.Article
    .findOne({_id:req.params.id})
    .populate("comments") //then populate all the comments associated with it
    .then(function(dbArticle) {
      //send it back to the client if successful
      console.log(dbArticle);
      var articleInfo = "";

      //if comment(s) found
      if (dbArticle.comments.length > 0) {
        articleInfo = {
          articleId : req.params.id,
          commented : true,
          comments : dbArticle.comments
        }
      } else {
        articleInfo = {
          articleId : req.params.id,
          commented : false
        }
      }
      //send the response back to client
      res.json(articleInfo);
    })
    .catch(function(err) {
      //otherwise send error message to client
      res.json(err);
    })
});


//this is the route to delete a comment from an article
router.put("/articles/:id/comments/:commentid", function(req, res) {
  console.log("I am deleting comment id : " + req.params.commentid + " for article id : " + req.params.id);
  db.Article
  .updateOne({ _id : req.params.id }, { $pull : { comments : req.params.commentid} })
  .then(function(dbArticle) {
    //now delete the comment document in the Comment collection
    return db.Comment.deleteOne({_id : req.params.commentid});
  })
  .then(function(dbComment) {
    //send this as response to client if successful
    res.json(dbComment);
  })
  .catch(function(err) {
    //if there's an error, send the error message
    res.json(err);
  });
});

//this is the route to unsave an article
router.put("/articles/:id", function(req, res) {
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