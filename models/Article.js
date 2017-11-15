//require mongoose
var mongoose = require("mongoose");

//save reference to the Schema constructor
var Schema = mongoose.Schema

//using the Schema constructor, create a new ArticleSchema object
var ArticleSchema = new Schema({
  //headline is required and of type String
  headline : {
    type : String,
    unique : true,
    required : true
  },
  //summary is required and of type String
  summary : { 
    type : String,
    required : true
  },
  url : {
    type : String,
    required : true
  },
  saved : {
    type : Boolean,
    default : false
    //required : true
  },
  comment : {
    type : Schema.Types.ObjectId,
    ref : "Comment"
  }
});

//this creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

//export the Article model
module.exports = Article;
