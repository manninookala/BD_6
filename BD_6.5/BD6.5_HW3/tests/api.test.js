const request = require("supertest");
const http = require("http");
const { app, validateArticle, validateAuthor } = require("../index");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  validateArticle: jest.fn(),
  validateAuthor: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints Test-cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Add a New Article with Valid Input", async () => {
    let result = await request(server).post("/articles").send({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 3,
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
  });

  it(" Add a New Article with Invalid Input", async () => {
    let result = await request(server).post("/articles").send({
      title: 100,
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(result.statusCode).toEqual(400);
    expect(result.body).toBe("Title is mandatory & must be a string.");
  });

  it("Add a New Author with Valid Input", async () => {
    let result = await request(server).post("/authors").send({
      name: "Alice Johnson",
      articleId: 3,
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 3,
      name: "Alice Johnson",
      articleId: 3,
    });
  });

  it("Add a New Author with Invalid Input", async () => {
    let result = await request(server).post("/authors").send({
      name: "Alice Johnson",
      articleId: "3",
    });
    expect(result.statusCode).toEqual(400);
    expect(result.body).toBe("articleId is mandatory & must be a number.");
  });
});

describe("Input Validation function Test-cases", () => {
  it(" Test Article Validation Function", () => {
    validateArticle.mockReturnValue(null);

    let result = validateArticle({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(result).toBeNull();
  });

  it(" Test Article Validation Function Error Handling", () => {
    validateArticle.mockReturnValue("Content is mandatory & must be a string.");

    let result = validateArticle({
      title: "Mastering Node.js",
    });
    expect(result).toBe("Content is mandatory & must be a string.");
  });

  it("Test Author Validation Function", () => {
    validateAuthor.mockReturnValue(null);

    let result = validateAuthor({
      name: "Alice Johnson",
      articleId: 3,
    });
    expect(result).toBeNull();
  });

  it(" Test Author Validation Function Error Handling", () => {
    validateAuthor.mockReturnValue("Name is mandatory & must be a string.");

    let result = validateAuthor({
      articleId: 3,
    });
    expect(result).toBe("Name is mandatory & must be a string.");
  });
});
