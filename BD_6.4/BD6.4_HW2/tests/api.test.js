let request = require("supertest");
let http = require("http");
let { app } = require("../index");
let { getGames, getGenres, getGameById, getGenreById } = require("../games");

jest.mock("../games.js", () => ({
  ...jest.requireActual("../games.js"),
  getGames: jest.fn(),
  getGameById: jest.fn(),
  getGenreById: jest.fn(),
  getGenres: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints handling 404 Error Test-cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/games should return 404 if not games found", async () => {
    getGames.mockResolvedValue([]);

    let response = await request(server).get("/api/games");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No games found");
  });

  it("GET /api/games/:id should return 404 for a non-existent Id", async () => {
    getGameById.mockReturnValue(null);

    let response = await request(server).get("/api/games/99");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Game not found");
  });

  it("GET /api/genres should return 404 if not genres found", async () => {
    getGenres.mockResolvedValue([]);

    let response = await request(server).get("/api/genres");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No genres found");
  });

  it("GET /api/genres/:id should return 404 for a non-existent Id", async () => {
    getGenreById.mockResolvedValue(null);

    let response = await request(server).get("/api/genres/99");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Genre not found");
  });
});
