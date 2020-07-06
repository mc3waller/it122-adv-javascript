/* Main entry point of the application */

// Imported modules and their reference variables
var http = require('http');
var games = require('./data');

// Create reference to getAll() function from the data module
var showGames = games.getAll();

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