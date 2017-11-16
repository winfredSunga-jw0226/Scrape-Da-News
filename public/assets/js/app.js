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
$(".comment").on("click", function(event) {
  //prevent page from simply refresing
  event.preventDefault();

  var articleId = $(this).attr("data-article-id");

  //place the article id in the modal header
  $(".modal-title").text("Comments for Article: " + articleId);

  //add data attribute to the modal's save button
  $("#submit-comment").attr("data-article-id", articleId);

});

//event listener for saving comments
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
    location.reload();
  });
});

