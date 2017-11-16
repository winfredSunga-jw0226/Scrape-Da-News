var mongoose = require("mongoose");

//save a reference to the Schema constructor
var Schema = mongoose.Schema;

//using the schema constructor, create a new CommentSchema object
var CommentSchema = new Schema ({
  //title is of type String
  //title : String,
  //body is of type String
  text : String 
});

//this creates our model from the above schema, using mongoose's model method 
var Comment = mongoose.model("Comment", CommentSchema);

//Export the Note model
module.exports = Comment;