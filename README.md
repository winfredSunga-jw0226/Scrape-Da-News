# Scrape-Da-News

### Overview

This is a web gives users access to the lastest San Francisco Chronicle articles and gives options to - 
  * save articles
  * add/delete comments for a specific article
  * unsave articles. 

### Instructions

To get or 'scrape' new articles from main SF Chronicle website - 
  * click on the `Scrape New Articles` button from the top navigation bar
  * new articles will be populated on the bottom of the page

*To Read An Article*
  * scroll down to view the list of articles, enclosed in their own individual panels
  * pick an article you wish to read
  * the article's panel has 3 main parts
    * article title on the top-left corner which takes you to the article's page when clicked
    * summary of the article on the body of the panel
    * `Save Article` button on the top-right corner which allows you to save the article

*To View Saved Articles*
  * click on the `Saved Articles` button which is located in the navigation bar (top of the page)
  * this takes you to a new page - the artices you saved are listed just as they were in the main page. The only difference is that it now has two buttons 
    * `Article Comments` - allows you to save comments on an article by filling out a popup form. The same form will display any existing comment for that specific article
    * `Unsave` - allows you to unsave the artice

*To View, Add, or Delete Article Comments* 
  * while in the `Saved Articles` page pick one article
  * click on the `Article Comments` button 
  * a popup window appears which allows you to do these -
    * add a comment by typing in your comment in the input box
    * click the save button to save the article
    * otherwise close the popup window by clicking on the `X` button on the top right button
    * existing comment(s) on the article is(are) shown on the window 
    * delete a comment by clicking on the red colored `X` button 

To go back to the main page, simply click on the `SF Chronicle Scraper` link located on the top left corner of the browser window. 

### Demo

Want to see this app in action? Watch the demo below - 

![*How to scrape for new articles*](public/assets/images/scrape-and-save-articles.mp4)

![*How to view, add, delete article comments*](public/assets/images/view-add-delete-comments.mp4)

### Tech Details

Front End Tech Used
  * HTML5
  * CSS
  * Bootstrap
  * Javascript
  * jQuery

Backend Tech Used
  * Node
  * Javascript
  * Express
  * Handlebars
  * MongoDB

NPM Packages Used
  * [express - Fast, unopinionated, minimalist web framework for node.](https://www.npmjs.com/package/express)
  * [express-handlebars - A Handlebars view engine for Express which doesn't suck.](https://www.npmjs.com/package/express-handlebars)
  * [mongoose - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.](https://www.npmjs.com/package/mongoose)
  * [body-parser - Node.js body parsing middleware](https://www.npmjs.com/package/body-parser)
  * [cheerio - Fast, flexible & lean implementation of core jQuery designed specifically for the server.](https://www.npmjs.com/package/cheerio)
  * [request - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.](https://www.npmjs.com/package/request)