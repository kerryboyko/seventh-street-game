import Board from "./Board";

describe("class Board", () => {
  const board = new Board("seventhst test");
  it("generates a neighborhood", () => {
    expect(board.debug()).toMatchInlineSnapshot(`
      {
        "deck": Deck {
          "cards": [
            Card {
              "rank": 10,
              "suit": "c",
            },
            Card {
              "rank": 11,
              "suit": "d",
            },
            Card {
              "rank": 7,
              "suit": "c",
            },
            Card {
              "rank": 9,
              "suit": "h",
            },
            Card {
              "rank": 3,
              "suit": "s",
            },
            Card {
              "rank": 6,
              "suit": "s",
            },
            Card {
              "rank": 14,
              "suit": "s",
            },
            Card {
              "rank": 5,
              "suit": "s",
            },
            Card {
              "rank": 13,
              "suit": "d",
            },
            Card {
              "rank": 9,
              "suit": "d",
            },
            Card {
              "rank": 5,
              "suit": "c",
            },
            Card {
              "rank": 13,
              "suit": "h",
            },
            Card {
              "rank": 7,
              "suit": "d",
            },
            Card {
              "rank": 4,
              "suit": "d",
            },
            Card {
              "rank": 10,
              "suit": "h",
            },
            Card {
              "rank": 14,
              "suit": "h",
            },
            Card {
              "rank": 8,
              "suit": "h",
            },
            Card {
              "rank": 6,
              "suit": "d",
            },
            Card {
              "rank": 11,
              "suit": "s",
            },
            Card {
              "rank": 13,
              "suit": "s",
            },
            Card {
              "rank": 14,
              "suit": "c",
            },
            Card {
              "rank": 4,
              "suit": "c",
            },
            Card {
              "rank": 2,
              "suit": "d",
            },
            Card {
              "rank": 3,
              "suit": "c",
            },
            Card {
              "rank": 13,
              "suit": "c",
            },
            Card {
              "rank": 8,
              "suit": "d",
            },
            Card {
              "rank": 2,
              "suit": "h",
            },
            Card {
              "rank": 10,
              "suit": "d",
            },
            Card {
              "rank": 12,
              "suit": "h",
            },
            Card {
              "rank": 8,
              "suit": "s",
            },
            Card {
              "rank": 12,
              "suit": "c",
            },
            Card {
              "rank": 4,
              "suit": "s",
            },
            Card {
              "rank": 3,
              "suit": "h",
            },
            Card {
              "rank": 12,
              "suit": "d",
            },
            Card {
              "rank": 3,
              "suit": "d",
            },
            Card {
              "rank": 2,
              "suit": "c",
            },
            Card {
              "rank": 5,
              "suit": "h",
            },
            Card {
              "rank": 9,
              "suit": "c",
            },
            Card {
              "rank": 8,
              "suit": "c",
            },
            Card {
              "rank": 6,
              "suit": "c",
            },
            Card {
              "rank": 10,
              "suit": "s",
            },
            Card {
              "rank": 14,
              "suit": "d",
            },
            Card {
              "rank": 7,
              "suit": "s",
            },
            Card {
              "rank": 2,
              "suit": "s",
            },
            Card {
              "rank": 12,
              "suit": "s",
            },
            Card {
              "rank": 11,
              "suit": "h",
            },
            Card {
              "rank": 11,
              "suit": "c",
            },
            Card {
              "rank": 5,
              "suit": "d",
            },
            Card {
              "rank": 6,
              "suit": "h",
            },
            Card {
              "rank": 4,
              "suit": "h",
            },
            Card {
              "rank": 9,
              "suit": "s",
            },
            Card {
              "rank": 7,
              "suit": "h",
            },
          ],
          "cursor": 32,
          "dealCard": [Function],
          "dealCards": [Function],
          "length": 52,
          "rng": [Function],
          "seed": "seventhst test",
        },
        "neighborhood": {
          "ids": [
            "N0",
            "N1",
            "N2",
            "N3",
            "N4",
            "N5",
            "N6",
            "N7",
            "E0",
            "E1",
            "E2",
            "E3",
            "E4",
            "E5",
            "E6",
            "E7",
            "S0",
            "S1",
            "S2",
            "S3",
            "S4",
            "S5",
            "S6",
            "S7",
            "W0",
            "W1",
            "W2",
            "W3",
            "W4",
            "W5",
            "W6",
            "W7",
          ],
          "neighborhood": {
            "E0": {
              "card": Card {
                "rank": 13,
                "suit": "d",
              },
              "name": "E0",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "E1": {
              "card": Card {
                "rank": 9,
                "suit": "d",
              },
              "name": "E1",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "E2": {
              "card": Card {
                "rank": 5,
                "suit": "c",
              },
              "name": "E2",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "E3": {
              "card": Card {
                "rank": 13,
                "suit": "h",
              },
              "name": "E3",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "E4": {
              "card": Card {
                "rank": 7,
                "suit": "d",
              },
              "name": "E4",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "E5": {
              "card": Card {
                "rank": 4,
                "suit": "d",
              },
              "name": "E5",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "E6": {
              "card": Card {
                "rank": 10,
                "suit": "h",
              },
              "name": "E6",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "E7": {
              "card": Card {
                "rank": 14,
                "suit": "h",
              },
              "name": "E7",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "N0": {
              "card": Card {
                "rank": 10,
                "suit": "c",
              },
              "name": "N0",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "N1": {
              "card": Card {
                "rank": 11,
                "suit": "d",
              },
              "name": "N1",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "N2": {
              "card": Card {
                "rank": 7,
                "suit": "c",
              },
              "name": "N2",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "N3": {
              "card": Card {
                "rank": 9,
                "suit": "h",
              },
              "name": "N3",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "N4": {
              "card": Card {
                "rank": 3,
                "suit": "s",
              },
              "name": "N4",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "N5": {
              "card": Card {
                "rank": 6,
                "suit": "s",
              },
              "name": "N5",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "N6": {
              "card": Card {
                "rank": 14,
                "suit": "s",
              },
              "name": "N6",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "N7": {
              "card": Card {
                "rank": 5,
                "suit": "s",
              },
              "name": "N7",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "S0": {
              "card": Card {
                "rank": 8,
                "suit": "h",
              },
              "name": "S0",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "S1": {
              "card": Card {
                "rank": 6,
                "suit": "d",
              },
              "name": "S1",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "S2": {
              "card": Card {
                "rank": 11,
                "suit": "s",
              },
              "name": "S2",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "S3": {
              "card": Card {
                "rank": 13,
                "suit": "s",
              },
              "name": "S3",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "S4": {
              "card": Card {
                "rank": 14,
                "suit": "c",
              },
              "name": "S4",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "S5": {
              "card": Card {
                "rank": 4,
                "suit": "c",
              },
              "name": "S5",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "S6": {
              "card": Card {
                "rank": 2,
                "suit": "d",
              },
              "name": "S6",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "S7": {
              "card": Card {
                "rank": 3,
                "suit": "c",
              },
              "name": "S7",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "W0": {
              "card": Card {
                "rank": 13,
                "suit": "c",
              },
              "name": "W0",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "W1": {
              "card": Card {
                "rank": 8,
                "suit": "d",
              },
              "name": "W1",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "W2": {
              "card": Card {
                "rank": 2,
                "suit": "h",
              },
              "name": "W2",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "W3": {
              "card": Card {
                "rank": 10,
                "suit": "d",
              },
              "name": "W3",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "W4": {
              "card": Card {
                "rank": 12,
                "suit": "h",
              },
              "name": "W4",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "W5": {
              "card": Card {
                "rank": 8,
                "suit": "s",
              },
              "name": "W5",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "W6": {
              "card": Card {
                "rank": 12,
                "suit": "c",
              },
              "name": "W6",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
            "W7": {
              "card": Card {
                "rank": 4,
                "suit": "s",
              },
              "name": "W7",
              "owner": null,
              "revealed": false,
              "scored": false,
              "visibleToThesePlayers": [],
            },
          },
        },
      }
    `);
  });
});
