/* Test code for array functions */

/* =============================================
MODULE IMPORTS
================================================ */

const expect = require('chai').expect;
const games = require('../data.js');
var assert = require('chai').assert;

const displayGames = games.getAll();


/* =============================================
getItem TEST
================================================ */

// describe("Games module", () => {
//     it("Returns requested game", () => {
//         const result = games.getGame("Bastion");
//         expect(result).to.deep.equal({title: 'Bastion', developer: 'Supergiant Games', genre: 'Action role-playing', year: 2011});
//     });
//     it("Fails to retrieve an invalid game", () => {
//         const result = games.getGame("Castle Crashers");
//         expect(result).to.be.undefined;
//     });
// });


/* =============================================
addItem TEST
================================================ */

describe("Games module", () => {
    it("Adds requested game if it doesn't already exist", () => {
        const result = games.addGame("Castle Crashers", "The Behemoth", "Action", 2008);
        assert.notExists(result, "Does not already exist");
    });
    it("Fails to add an existing game", () => {
        const result = games.addGame("Bastion", "Supergiant Games", "Action role-playing", 2011);
        assert.exists(result, "Already exists");
    });
});

// ==============

describe("Games module", () => {
    it("Adds requested game if it doesn't already exist", () => {
        const result = games.addGame("Castle Crashers", "The Behemoth", "Action", 2008);
        expect(result).to.be.undefined;
    });
    it("Fails to add with existing game", () => {
        const result = games.addGame("Bastion", "Supergiant Games", "Action role-playing", 2011);
        expect(result).to.exist;
    });
});


/* =============================================
deleteItem TEST
================================================ */