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

// exports.games = games


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
    const searchedGame = games.find(games => games.title === titleSearch);
    return searchedGame;
};

// // Sample function call
// console.log(getGame('Bastion'));


// /* Helper function for addGame() that checks if the item already exists
// Can be ran as an independant function, but only compares the [title] values between items */
// exports.checkExists = (title) => {
//     const game = games.getGame(title);
//     if (game !== undefined) { // If game IS defined ...
//         return true;
//     } else { // If the game is NOT defined ...
//         return false;
//     }
// }


// Adds a new item to the end of the array and outputs a confirmation with its [title]
exports.addGame = (title, developer, genre, year) => {
    if ([title, developer, genre, year].includes(undefined)) {
        console.log('Error - each property must have a value'); // Varifies if a value is entered for all properties
    } else {
        // const exists = games.checkExists(title);
        const game = games.find(games => games.title === title);

        if (game == undefined) {
            games.push({
            title: title,
            developer: developer,
            genre: genre,
            year: year});

            console.log(`Added game: "${title}"`);
        } else {
            // console.log(`"${title}" already exists!`);
            return;
        }
    }
}

// // Sample function call
// addGame("Amnesia the Dark Descent", "Frictional Games", "Survival horror", 2010);
// addGame("Bastion", "Supergiant Games", "Action role-playing", 2011);


/* Removes an item from the array and outputs a confirmation with its [title]
The [title] of the item is passed as a parameter to retrieve it with getGame() and find its index position
for the slice() function */
exports.deleteGame = (title) => {
    if ([title].includes(undefined) || title === "") {
        console.log('Error - no value entered') // Verifies if a value is entered (also excludes empty strings)
    } else {
        const searchedGame = games.find(games => games.title === title); // Reference searched item
        if (searchedGame == undefined) {
            console.log('Error - game does not exist'); // Verifies if the item exists
        } else {
            games.splice(games.indexOf(searchedGame), 1); // Finds the index of found item and removes it
            // console.log(`Removed game: "${title}"`);
        }
    }
}

// Sample function call
// deleteGame('Journey');


console.log("Yup, it works!")