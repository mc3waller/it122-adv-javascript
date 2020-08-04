/* Main entry point of the application */

/* =============================================
MODULE IMPORTS
================================================ */

// Imported modules and their reference variables
// const http = require('http');
// const games = require('./data');
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

// Imports the Game schema from the remote database
const Game = require('./models/games');
const { assert } = require("chai");


/* =============================================
CONFIGURATIONS & REFERENCES
================================================ */

// Create reference to Express functionality
const app = express();

// Create reference to getAll() function from the data module to access array items
// const displayGames = games.getAll();

// Template engine (layoutsDir overrides default layout directory)
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

// Configuration for Express
app.set('port', process.env.PORT || 3000); // Use this port
app.use(express.static(__dirname + '/public')); // Set location for static files
app.use(bodyParser.urlencoded({extended: true})); // Parse form submissions

// Configuration for API
app.use('/api', require('cors')());


/* =============================================
HANDLEBARS ROUTING FROM DATABASE WITH API
================================================ */

// This version runs the find() function on documents within the Game collection to retrieve the requested data

// getAll API route
app.get('/api/games', (req, res) => {
  return Game.find({}).lean()
    .then((games) => { // Retrieves all of the collection's contents and retuns it to the main function
        // res.json sets appropriate status code and response header
        res.json(games); // Display the collection in JSON format
    })
    .catch(err => {
      res.status(500).send('Error occurred: database error', err) // Catch error response
    });
});

// get single item API route
app.get('/api/games/:title', (req, res) => {
  return Game.findOne({title: req.params.title}).lean()
  .then((game) => { // Retrieves the document requested by [title] and returns it to the main function
    if (game === null) { // If the document does not exist ...
      return res.status(400).send('Error: game not found') // Return an error
    } else { // Otherwise ...
      res.json(game) // Display the document in JSON format
    }
  })
  .catch(err => {
    res.status(500).send('Error occurred: database error', err) // Catch error response
  })
})

// add/update item API route
app.post('api/games/add', (req, res) => {
  const newGame = req.body
  Game.update({title: newGame.title}, newGame, {upsert: true}, (err, result) => {
    if (err) return next(err);
    console.log(newGame)
  })
})

// delete item API route
app.delete('api/games/delete/:title', (req, res) => {
  return Game.findOneAndDelete({title: req.params.title}).lean()
  .then((game) => {
    if (game === null) {
      res.status(400).send('Error: game not found')
    } else {
      res.json(game)}
    })
    .catch(err => {
      res.status(500).send('Error occured: database error', err)
  })
})


/* =============================================
HANDLEBARS ROUTING FROM DATABASE
================================================ */

// // This version runs the find() function on documents within the Game collection to retrieve the requested data

// /* Retrieves, processes, and sends content to the 'home' template
// Similar to setting status code, content type, and sending HTML contet all at once */
// app.get('/', (req, res, next) => {
//   return Game.find({}).lean().then((games) => { // Finds all data within the collection and returns a reference
//     res.render('home', { games }); // Renders 'home' page, passing the data reference to the view
//   }).catch(err => next(err)); // Error response
// });

// // Sends content to the 'details' template
// app.get('/details', (req, res, next) => {
//   return Game.findOne({title: req.query.title}).lean().then((game) => { // Finds the document matching requested [title] and returns a reference
//     res.render('details', { title: game.title, game }); // Renders 'details' page, passing data reference to the view ({page title, data})
//   }).catch(err => next(err)); // Error response
// });

// // Deletes a document from the collection specified by its [title]
// app.get('/delete', (req, res) => {
//   Game.findOneAndDelete({title: req.query.title}, (err, game) => { // Finds the document matching the requested [title] and creates a reference
//     if (err) {
//       console.log(err); // Error response
//     } else if (!game) {
//       console.log('Error - game does not exist'); // Error response if the item does not exist
//       res.send('Error - game does not exist');
//     } else {
//       console.log(`Removed "${game.title}"`); // Success response if the item is found and removed
//       res.send(`Removed "${game.title}"`);
//     }
//   });
// });


/* =============================================
GENERAL ROUTING - MODIFIED FOR REMOTE DATABASE
================================================ */

// // home route
// app.get('/', (req, res) => {
//   res.type('text/html');
//   res.sendFile(__dirname + '/public/home.html'); 
//  });

// detail route
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send("About page\n" + "My name is Malik and I'm in my second year at SCC, slowly but surely grinding away for that programming certificate.");
 });

// Define 404 handler, responding to all other requests
// app.use( (req, res) => {
//   res.type('text/plain'); 
//   res.status(404);
//   res.send('404 - Not Found');
//  });

// App startup
app.listen(app.get('port'), () => {
  console.log('Express started'); 
 });


/* =============================================
GENERAL ROUTING - EXPRESS [unussed]
================================================ */

// // Send static file as response
// app.get('/', (req, res) => {
//   res.type('text/html');
//   res.sendFile(__dirname + '/public/home.html'); 
//  });

// // Send plain text response
// app.get('/about', (req, res) => {
//   res.type('text/plain');
//   res.send("About page\n" + "My name is Malik and I'm in my second year at SCC, slowly but surely grinding away for that programming certificate.");
//  });

// // Define 404 handler, responding to all other requests
// app.use( (req, res) => {
//   res.type('text/plain'); 
//   res.status(404);
//   res.send('404 - Not Found');
//  });

// // App startup
// app.listen(app.get('port'), () => {
//   console.log('Express started'); 
//  });


/* =============================================
GENERAL ROUTING - HTTP [unused]
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