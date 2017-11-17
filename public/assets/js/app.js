//event listener for scraping new articles
$("#btn-scrape").on("click", function(event) {
  //prevent page from simply refresing
  event.preventDefault()

  //submit a GET request to the route of /scrape
  $.get("/allnews/scrape", function(response) {
    //reload the page to display newly scraped articles
    location.reload();
  });
});

//event listener for saving articles
$(document).on("click", ".save-article", function(event) {
  //prevent page from simply refresing
  event.preventDefault();

  //grab the article id from the event
  var articleId = $(this).attr("data-article-id");
  var queryURL = "/allnews/articles/" + articleId + "?_method=PUT";

  //console.log("I want to save this  article : " + articleId);

  //send a PUT request to the server for a specific articleid
  $.post(queryURL, function(response) {
    //reload the page
    location.reload();
  }); 
});

//event listener for unsaving articles 
$(".unsave-article").on("click", function(event) {
  //prevent page from simply refresing
  event.preventDefault();

  //grab the article id from the event
  var articleId = $(this).attr("data-article-id");
  var queryURL = "/savednews/articles/" + articleId + "?_method=PUT";

  //send PUT request to the server for a specific articleId
  $.post(queryURL, function(response) {
    //reload the page
    location.reload();
  })
});

//event listener for hitting the Article Comments button
$(".article-comments").on("click", function(event) {
  //prevent page from simply refresing
  event.preventDefault();

  var articleId = $(this).attr("data-article-id");
  var queryString = "/savednews/articles/" + articleId + "/comments";

  console.log("article id i want to see comments for :" + articleId)

  //place the article id in the modal header
  $(".modal-title").text("Comments for Article: " + articleId);

  //add data attribute to the modal's save button
  $("#submit-comment").attr("data-article-id", articleId);

  //submit a GET request to the server, for this route - 
  $.get(queryString, function(response) {
    console.log(response);
    populateModal(response);
    //location.reload();
  });    
});

//event listener for saving comments for a specific article
$("#submit-comment").on("click", function(event) {
  //prevent page from simply refresing
  event.preventDefault();

  //grab the article id from the data attribute of the modal's save button
  var articleId = $("#submit-comment").attr("data-article-id");

  //grab the comment to pass to the server
  var comment = $("#comment-text").val().trim();

  console.log(comment);

  //submit a POST request to the server, for this route - /savednews/comments/:id
  $.post("/savednews/articles/" + articleId + "/comments", {text : comment}, function(response) {
    //reload the page
    console.log(response);
    location.reload();
  });
});

//listener to delete individual comments
$(document).on("click", ".btn-delete-comment", function(event) {
  console.log("I am going to delete this comment");

  var commentId = $(this).attr("data-comment-id");
  var articleId = $(this).attr("data-article-id");
  var queryURL = "/savednews/articles/" + articleId + "/comments/" +  commentId +  "?_method=PUT";

  $.post(queryURL, function(response) {
    //location.reload();
    console.log(response);
  });
});

function populateModal(articleObject) {
  //first empty elements under modal-body class
   $(".div-comment").remove();

  // //place the article id in the modal header
  // $(".modal-title").text("Comments for Article: " + articleObject._id);

  // //add data attribute to the modal's save button
  // $("#submit-comment").attr("data-article-id", articleObject._articleId);

  //if comment(s) exist for the article
  if (articleObject.comments) {
    //iterate through each comment and display in the modal
    articleObject.comments.forEach(function(comment) {
      var div = $("<div>").addClass("div-comment clearfix");
      var p = $("<p>").addClass("p-comment text-center").text(comment.text);
      var btn = $("<button>").addClass("btn btn-danger btn-delete-comment pull-right").attr("type", "button")
      .attr("data-comment-id", comment._id)
      .attr("data-article-id", articleObject.articleId)
      .attr("data-dismiss", "modal")
      .text("X");

      div.prepend(p, btn);

      //append all new elements under modal-body class
      $(".modal-body").prepend(div);
    });
  } 
  //else display that no comment exists
  else {
    var div = $("<div>").addClass("div-comment text-center").text("No comment for this article yet");
    //append all new elements under modal-body class
    $(".modal-body").prepend(div);
  }
}
