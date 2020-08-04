const mongoose = require('mongoose');
const credentials = require('../dbcredentials')

// remote db connection settings. For security, connectionString should be in a separate file not committed to git

// local db connection settings 
// const ip = process.env.ip || '127.0.0.1';
// const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(credentials.connectionString, { dbName: 'sccprojects', useNewUrlParser: true, useUnifiedTopology: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected');
});

// define Game model in JSON key/value pairs
// values indicate the data type of each key
const gameSchema = new mongoose.Schema({
 title: { type: String, required: true },
 developer: String,
 genre: String,
 year: Number,
}); 

module.exports = mongoose.model('Game', gameSchema);