import Board from "./Board";
import { pick, mapValues } from "radash";

describe("class Board", () => {
  const board = new Board("seventhst test");
  it("constructor() generates a neighborhood", () => {
    expect(board.debug()).toMatchSnapshot();
  });
  it("Board.getBoardState() can get a board state", () => {
    expect(board.getBoardState()).toMatchSnapshot();
  });
  it("Board.addPlayer() can add players", () => {
    expect(board.addPlayer("player1")).toBe(true);
    expect(board.addPlayer("player2")).toBe(true);
    expect(board.players).toEqual(["player1", "player2"]);
    expect(board.addPlayer("player1")).toBe(false);
    expect(board.players).toEqual(["player1", "player2"]);
    expect(board.addPlayer("player3")).toBe(true);
    expect(board.players).toEqual(["player1", "player2", "player3"]);
  });
  it("Board.setOwner can set owners of properties", () => {
    board.setOwner("player1", "E1");
    board.setOwner("player2", "W2");
    board.setOwner("player3", "S3");
    expect(() => board.setOwner("player4", "N4")).toThrow(
      "No player named player4 is playing"
    );
    expect(() => board.setOwner("player1", "Q3")).toThrow(
      "No property named Q3 exists"
    );
  });
  it("will display the correct info to the correct owners", () => {
    const boardState = board.getBoardState();
    const cherryPicker = (
      obj: Record<string, Record<string, any>>,
      firstSetProps: string[],
      secondSetProps: string[]
    ) => {
      return mapValues(pick(obj, firstSetProps), (value) =>
        pick(value, secondSetProps)
      );
    };
    const anonymous = cherryPicker(
      board.getBoardState(),
      ["E1", "W2", "S3", "N4"],
      ["name", "cardDisplay", "owner"]
    );
    console.log(Object.keys(anonymous))

    const p1 = cherryPicker(
      board.getBoardState("player1"),
      ["E1", "W2", "S3", "N4"],
      ["name", "cardDisplay", "owner"]
    );
    const p2 = cherryPicker(
      board.getBoardState("player2"),
      ["E1", "W2", "S3", "N4"],
      ["name", "cardDisplay", "owner"]
    );
    const p3 = cherryPicker(
      board.getBoardState("player3"),
      ["E1", "W2", "S3", "N4"],
      ["name", "cardDisplay", "owner"]
    );
    ["E1", "W2", "S3", "N4"].forEach((property) => {
      if (property !== "E1") {
        expect(p1[property]).toEqual(anonymous[property]);
      }
      if (property !== "W2") {
        expect(p2[property]).toEqual(anonymous[property]);
      }
      if (property !== "S3") {
        expect(p3[property]).toEqual(anonymous[property]);
      }
    });
    ["E1", "W2", "S3", "N4"].forEach((property) => {
      expect(anonymous[property].cardDisplay).toBe("??")
    })
    expect(anonymous["E1"].cardDisplay).toBe("??");
    expect(p1.E1.cardDisplay).toBe("5♠");
    expect(p2.W2.cardDisplay).toBe("2♦");
    expect(p3.S3.cardDisplay).toBe("8♥");
    expect(anonymous).toEqual({
      E1: {
        cardDisplay: "??",
        name: "E1",
        owner: "player1",
      },
      N4: {
        cardDisplay: "??",
        name: "N4",
        owner: null,
      },
      S3: {
        cardDisplay: "??",
        name: "S3",
        owner: "player3",
      },
      W2: {
        cardDisplay: "??",
        name: "W2",
        owner: "player2",
      },
    });
  });
});
