/* Main entry point of the application */

// Imported modules and their reference variables
const http = require('http');
const games = require('./data');

// Import and reference for Express and body-parser
const express = require("express");
const bodyParser = require("body-parser")

// Import and reference for express-handlebars
let exphbs = require("express-handlebars");

const app = express();

// Create reference to getAll() function from the data module
const showGames = games.getAll();

// Template engine
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

// Configuration for Express
app.set('port', process.env.PORT || 3000); // Use this port
app.use(express.static(__dirname + '/public')); // Set location for static files
app.use(bodyParser.urlencoded({extended: true})); // Parse form submissions

/* Retrieves, processes, and sends the 'home' template
Similar to setting status code and content type - as well as sending HTML content - all at once */
app.get('/', function(req, res) {
  res.render('home');
 });

 // Send content of 'home' view
app.get('/get', function(req, res) {
  let result = games.get(req.query.title);
  res.render('details', {title: req.query.title, games: result });
 });

// Send static file as response
app.get('/', function(req, res) {
  res.type('text/html');
  res.sendFile(__dirname + '/public/home.html'); 
 });

// Send plain text response
app.get('/about', function(req, res) {
  res.type('text/plain');
  res.send('About page');
 });

// Define 404 handler, responding to all other requests
app.use( function(req, res) {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
 });

// App startup
app.listen(app.get('port'), function() {
  console.log('Express started'); 
 });

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