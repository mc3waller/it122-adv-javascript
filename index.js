/* Main entry point of the application */

/* =============================================
MODULE IMPORTS
================================================ */

// Imported modules and their reference variables
const http = require('http');
const games = require('./data');
const express = require("express");
const bodyParser = require("body-parser")
let exphbs = require("express-handlebars");

/* =============================================
CONFIGURATIONS & REFERENCES
================================================ */

// Create reference to Express functionality
const app = express();

// Create reference to getAll() function from the data module to access array items
const displayGames = games.getAll();

// Template engine (layoutsDir overrides default layout directory)
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

// Configuration for Express
app.set('port', process.env.PORT || 3000); // Use this port
app.use(express.static(__dirname + '/public')); // Set location for static files
app.use(bodyParser.urlencoded({extended: true})); // Parse form submissions

/* =============================================
HANDLEBARS ROUTING
================================================ */

/* Retrieves, processes, and sends content to the 'home' template
Similar to setting status code, content type, and sending HTML contet all at once */
app.get('/', (req, res) => {
  res.render('home', { gamesList: displayGames}); // Context object that sends the data array to 'home'
});

// Sends content to the 'details' view
app.get('/details', (req, res) => {
  // Create reference to an array item by running getGame() with the provided query value in details?title=[value]
  let result = games.getGame(req.query.title);
  // Context objects for specified item's [title] and its data acquired with getGame()
  res.render('details', {title: req.query.title, game: result});
});

/* =============================================
GENERAL ROUTING - EXPRESS
================================================ */

// Send static file as response
app.get('/', function(req, res) {
  res.type('text/html');
  res.sendFile(__dirname + '/public/home.html'); 
 });

// Send plain text response
app.get('/about', function(req, res) {
  res.type('text/plain');
  res.send("About page\n" + "My name is Malik and I'm in my second year at SCC, slowly but surely grinding away for that programming certificate.");
 });

// Define 404 handler, responding to all other requests
app.use( function(req, res) {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not Found');
 });

// App startup
app.listen(app.get('port'), function() {
  console.log('Express started'); 
 });

/* =============================================
GENERAL ROUTING - HTTP
================================================ */

 /*
// Web server
http.createServer(function (req, res) {
    const path = req.url.toLowerCase();
        switch(path) {
          // Home page response
            case '/':
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end("Welcome to the project home page!\n" + "There are " + showGames.length + " items in my array.");
              break;
          // About page response
            case '/about':
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end("About page\n" + "My name is Malik and I'm in my second year at SCC, slowly but surely grinding away for that programming certificate.");
              break;
          // Error response
            default:
              res.writeHead(404, {'Content-Type': 'text/plain'});
              res.end("404 - Not Found");
              break;
        }
    }).listen(process.env.PORT || 3000);
*/