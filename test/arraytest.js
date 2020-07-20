/* Test code for array functions */

/* =============================================
MODULE IMPORTS
================================================ */

const games = require('../data.js');
const expect = require('chai').expect;
const assert = require('chai').assert;


/* =============================================
getItem TEST
================================================ */

/* Tests getGame() with an item [title] to return the requested item if it exists, or fails to return if it does not
- If the item exists, the requested item item will be successfully returned
-If the item does not exist, the function will fail to return the requested item */

describe("Games module - getGame()", () => {
    it("Returns requested game", () => {
        const result = games.getGame("Bastion");
        expect(result).to.deep.equal({title: 'Bastion', developer: 'Supergiant Games', genre: 'Action role-playing', year: 2011});
    });
    it("Fails to retrieve an invalid game", () => {
        const result = games.getGame("Castle Crashers");
        expect(result).to.be.undefined;
    });
});


/* =============================================
addItem TEST
================================================ */

/* Tests addGame() which automatically checks if the new addition already exists
- If the item is successfully added (returning 'true'), the item did not already exist
- If the item fails to be added (returning 'false'), the item already exists */

describe("Games module - addGame()", () => {
    it("Adds requested game if it doesn't already exist", () => {
        const result = games.addGame({title: "Castle Crashers", developer: "The Behemoth", genre: "Action", year: 2008});
        assert.isTrue(result.added, "Successfully added game"); // expect(reuslt.add).to.equal.true;
    });
    it("Fails to add an existing game", () => {
        const result = games.addGame({title: 'Hollow Knight', developer: 'Team Cherry', genre: 'Action-adventure', year: 2017});
        assert.isFalse(result.added, "Faile to add - game already exists"); // expect(result.add).to.equal.false;
    });
});


/* =============================================
deleteItem TEST
================================================ */

/* Tests deleteGame() with an item [title] to remove the requested item if it exists, or fails to return if it does not
- If the item exists, the requested item item will be successfully removed
-If the item does not exist, the function will fail to remove the requested item */

describe("Games module - deleteGame()", () => {
    it("Removes requested game if it exists", () => {
        const result = games.deleteGame("Journey");
        assert.isTrue(result.removed, "Successfully removed game");
    });
    it("Fails to remove a game that does not exist", () => {
        const result = games.deleteGame("TowerFall Ascension");
        assert.isFalse(result.removed, "Failed to remove - game does not exist");
    });
});