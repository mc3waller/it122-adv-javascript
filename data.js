/* Data module for the application */

// An array of 5 objects with 4 attributes each
const games = [
    {title: 'Bastion', developer: 'Supergiant Games', genre: 'Action role-playing', year: 2011},
    {title: 'Hollow Knight', developer: 'Team Cherry', genre: 'Action-adventure', year: 2017},
    {title: 'Journey', developer: 'Thatgamecompany', genre: 'Adventure', year: 2012},
    {title: 'Ori and the Blind Forest', developer: 'Moon Studios', genre: 'Platform-adventure', year: 2015},
    {title: 'Unravel Two', developer: 'Coldwood Interactive', genre: 'Puzzle-platformer', year: 2018}
];

function listGames() {
    
}

const gamesList = listGames();

// Returns all items in the array
exports.getAll = function() {
    return games;
};