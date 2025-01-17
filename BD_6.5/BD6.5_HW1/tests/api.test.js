let request = require("supertest");
let http = require("http");
let { app, validateGame, validateTournament } = require("../index");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  validateGame: jest.fn(),
  validateTournament: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints for creating a record", () => {
  it("Return 201 for a valid Game", async () => {
    let result = await request(server)
      .post("/api/games")
      .send({ title: "The Legend of Zelda", genre: "Adventure" });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
    });
  });

  it("Return 400 for an invalid User", async () => {
    let result = await request(server)
      .post("/api/games")
      .send({ title: "The Legend of Zelda" });

    expect(result.statusCode).toEqual(400);
    expect(result.body).toBe("Genre is required & must be in String.");
  });

  it("Return 201 for a valid Tournament", async () => {
    let result = await request(server).post("/api/tournaments").send({
      name: "Zelda Championship",
      gameId: 1,
    });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      name: "Zelda Championship",
      gameId: 1,
    });
  });

  it("Return 400 for an invalid Tournament", async () => {
    let result = await request(server)
      .post("/api/tournaments")
      .send({ gameId: 1 });

    expect(result.statusCode).toEqual(400);
    expect(result.body).toBe("Name is required & must be in String.");
  });
});

describe("Testing the Validation Functions", () => {
  it("Validate Game", () => {
    expect(
      validateGame({
        title: "The Legend of Zelda",
        genre: "Adventure",
      }),
    ).toBeUndefined();
  });

  it("Validate Game Error msg", () => {
    let mockGame = { title: "The Legend of Zelda" };

    validateGame.mockReturnValue("Genre is required & must be in String.");
    let result = validateGame(mockGame);
    expect(result).toBe("Genre is required & must be in String.");
  });

  it("Validate Tournament", () => {
    expect(
      validateTournament({
        name: "Zelda Championship",
        gameId: 1,
      }),
    ).toBeUndefined();
  });

  it("Validate Tournament Error msg", () => {
    let mockTour = { gameId: 1 };

    validateGame.mockReturnValue("Name is required & must be in String.");
    let result = validateGame(mockTour);
    expect(result).toBe("Name is required & must be in String.");
  });
});
