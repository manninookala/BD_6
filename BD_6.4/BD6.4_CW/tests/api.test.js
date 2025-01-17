let request = require("supertest");
let http = require("http");
let { app } = require("../index.js");
let {
  getAllBooks,
  getAllReviews,
  getBookById,
  getReviewById,
  getUserById,
} = require("../books.js");

jest.mock("../books.js", () => ({
  ...jest.requireActual("../books.js"),
  getAllBooks: jest.fn(),
  getAllReviews: jest.fn(),
  getBookById: jest.fn(),
  getReviewById: jest.fn(),
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

describe("API Endpoints 404 Error Handling Testcases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/books should return 404 if no books are found", async () => {
    getAllBooks.mockResolvedValue([]);

    let response = await request(server).get("/api/books");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No books found");
  });

  it("GET /api/books/:id should return 404 for a non-existent book", async () => {
    getBookById.mockResolvedValue(null);

    let response = await request(server).get("/api/books/999");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Book not found");
  });

  it("GET /api/reviews should return 404 if no reviews found", async () => {
    getAllReviews.mockResolvedValue([]);

    let response = await request(server).get("/api/reviews");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Review not found");
  });

  it("GET /api/reviews/:id should return 404 by a non-existent Id", async () => {
    getReviewById.mockResolvedValue(null);

    let response = await request(server).get("/api/reviews/999");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Review not found");
  });

  it("GET /api/users/:id should return 404 for non-existent Id", async () => {
    getUserById.mockResolvedValue(null);

    let response = await request(server).get("/api/users/999");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("User not found");
  });
});
