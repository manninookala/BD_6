let request = require("supertest");
let http = require("http");
let { app, validateBook, validateReview, validateUser } = require("../index");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  validateBook: jest.fn(),
  validateReview: jest.fn(),
  validateUser: jest.fn(),
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
  it("Return 201 for a valid User", async () => {
    let result = await request(server)
      .post("/api/users")
      .send({ name: "Alice", email: "alice@example.com" });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    });
  });

  it("Return 400 for an invalid User", async () => {
    let result = await request(server)
      .post("/api/users")
      .send({ name: "Alice" });

    expect(result.statusCode).toEqual(400);
    expect(result.body).toBe("Email is required & must be in String.");
  });

  it("Return 201 for a valid Book", async () => {
    let result = await request(server).post("/api/books").send({
      title: "Moby Dick",
      author: "Herman Melville",
    });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      title: "Moby Dick",
      author: "Herman Melville",
    });
  });

  it("Return 400 for an invalid Book", async () => {
    let result = await request(server)
      .post("/api/books")
      .send({ author: "Herman Melville" });

    expect(result.statusCode).toEqual(400);
    expect(result.body).toBe("Title is required & must be in String.");
  });

  it("Return 201 for a valid Review", async () => {
    let result = await request(server)
      .post("/api/reviews")
      .send({ content: "Great book!", userId: 1 });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      content: "Great book!",
      userId: 1,
    });
  });

  it("Return 400 for an invalid Review", async () => {
    let result = await request(server)
      .post("/api/reviews")
      .send({ content: "Great book!", userId: "90" });

    expect(result.statusCode).toEqual(400);
    expect(result.body).toBe("userId is required & must be in Number.");
  });
});

describe("Testing the Validation Functions", () => {
  it("Validate User", () => {
    expect(
      validateUser({
        name: "Alice",
        email: "alice@example.com",
      }),
    ).toBeUndefined();
  });

  it("Validate Book", () => {
    expect(
      validateBook({
        title: "Moby Dick",
        author: "Herman Melville",
      }),
    ).toBeUndefined();
  });

  it("Validate User", () => {
    expect(
      validateReview({
        content: "Great book!",
        userId: 1,
      }),
    ).toBeUndefined();
  });
});
