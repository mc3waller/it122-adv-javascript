/* Data module for the application */

/* =============================================
DATA ARRAY
================================================ */

// An array of 5 objects with 4 attributes each
const games = [
    {title: 'Bastion', developer: 'Supergiant Games', genre: 'Action role-playing', year: 2011},
    {title: 'Hollow Knight', developer: 'Team Cherry', genre: 'Action-adventure', year: 2017},
    {title: 'Journey', developer: 'Thatgamecompany', genre: 'Adventure', year: 2012},
    {title: 'Ori and the Blind Forest', developer: 'Moon Studios', genre: 'Platform-adventure', year: 2015},
    {title: 'Unravel Two', developer: 'Coldwood Interactive', genre: 'Puzzle-platformer', year: 2018}
];


/* =============================================
ARRAY FUNCTIONS
================================================ */

// Returns all items in the array
exports.getAll = () => {
    return games;
};


/* Returns a specific item from the array and its details
The search term for [title] is passed and the return value is the item with the matching title */
exports.getGame = (titleSearch) => {
    if (!titleSearch || titleSearch === "") {
        return {'value': false, 'message': 'Error - no value entered'}; // Verifies if a value is entered (also excludes empty strings)
    } else {
    const searchedGame = games.find(games => games.title === titleSearch);
    return searchedGame;
    }
};

// // Sample function call
// console.log(this.getGame('Bastion'));


/* Helper function that checks if an item already exists
Can be ran as an independant function and only compares the [title] values between items */
exports.checkExists = (title) => {
    const game = this.getGame(title);
    if (!game) { // If game IS defined ...
        return true;
    } else { // If the game is NOT defined ...
        return false;
    }
}


// Adds a new item (passed as an object) to the end of the array and outputs a confirmation with its [title]
exports.addGame = (newGame) => {
    if (!newGame.title) {
        return {'value': false, 'message': 'Error - the new item must have a title'}; // Varifies if the item includes a title
    } else {
        // const exists = games.checkExists(title);
        const game = this.getGame(newGame.title); // Runs getGame() on new item's [title] to check if it exists

        if (!game) {
            games.push(newGame); // If the item does not already exist, add it
            return {'added': true, 'message': `Added game: "${newGame.title}"`}; // Reports success with a boolean object
        } else {
            return {'added': false, 'message': `"${newGame.title}" already exists`}; // Reports failure with a boolean object
        }
    }
}

// // Sample function call
// this.addGame({title:"Amnesia the Dark Descent", developer:"Frictional Games", genre:"Survival horror", year:2010});
// this.addGame({title: 'Bastion', developer: 'Supergiant Games', genre: 'Action role-playing', year: 2011});


/* Removes an item from the array and outputs a confirmation with its [title]
The [title] of the item is passed as a parameter to retrieve it with getGame() and find its index position
for the slice() function */
exports.deleteGame = (title) => {
    if (!title || title === "") {
        return {'value': false, 'message': 'Error - no value entered'}; // Verifies if a value is entered (also excludes empty strings)
    } else {
        const searchedGame = this.getGame(title); // Retrieve and reference searched item
        if (!searchedGame) {
            return {'removed': false, 'messge': 'Error - game does not exist'}; // Reports lookup failure with a boolean object
        } else {
            games.splice(games.indexOf(searchedGame), 1); // Finds the index of found item and removes it
            return {'removed': true, 'messge': `Removed "${searchedGame.title}"`}; // Reports lookup failure with a boolean object
        }
    }
}

// Sample function call
// this.deleteGame('Journey');