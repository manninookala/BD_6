let request = require("supertest");
let http = require("http");
let { app } = require("../index");
let {
  getArticles,
  getComments,
  getArticleById,
  getCommentById,
  getUserById,
} = require("../articles");

jest.mock("../articles.js", () => ({
  ...jest.requireActual("../articles.js"),
  getArticles: jest.fn(),
  getComments: jest.fn(),
  getArticleById: jest.fn(),
  getCommentById: jest.fn(),
  getUserById: jest.fn(),
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

  it("GET /api/articles should return 404 if not articles found", async () => {
    getArticles.mockResolvedValue([]);

    let response = await request(server).get("/api/articles");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No articles found");
  });

  it("GET /api/articles/:id should return 404 for a non-existent Id", async () => {
    getArticleById.mockReturnValue(null);

    let response = await request(server).get("/api/articles/99");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Article not found");
  });

  it("GET /api/comment should return 404 if not comment found", async () => {
    getComments.mockResolvedValue([]);

    let response = await request(server).get("/api/comments");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No comments found");
  });

  it("GET /api/comments/:id should return 404 for a non-existent Id", async () => {
    getCommentById.mockResolvedValue(null);

    let response = await request(server).get("/api/comments/99");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Comment not found");
  });

  it("GET /api/users/:id should return 404 for a non-existent Id", async () => {
    getUserById.mockResolvedValue(null);

    let response = await request(server).get("/api/users/99");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("User not found");
  });
});
