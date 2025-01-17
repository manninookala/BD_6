let request = require("supertest");
let http = require("http");
let { app, validateCompany, validateEmp } = require("../index");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  validateCompany: jest.fn(),
  validateEmp: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoint Test-cases for Valid & Invalid Inputs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Test Add a New Employee with Valid Input", async () => {
    let result = await request(server).post("/api/employees").send({
      name: "John Doe",
      companyId: 1,
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      name: "John Doe",
      companyId: 1,
    });
  });

  it("Test Add a New Employee with Invalid Input", async () => {
    let result = await request(server)
      .post("/api/employees")
      .send({ name: "John Doe", companyId: "99" });
    expect(result.statusCode).toEqual(400);
    expect(result.body).toBe("companyId is mandatory & must be a number.");
  });

  it("Test Add a New Company with Valid Input", async () => {
    let result = await request(server).post("/api/companies").send({
      name: "TechCorp",
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      name: "TechCorp",
    });
  });

  it("Test Add a New Company with Invalid Input", async () => {
    let result = await request(server)
      .post("/api/companies")
      .send({ name: 99 });
    expect(result.statusCode).toEqual(400);
    expect(result.body).toBe("Name is mandatory & must be a string.");
  });
});

describe("Test-cases for Vaditation Functions", () => {
  it(" Test Employee Validation", () => {
    validateEmp.mockReturnValue(null);

    let result = validateEmp({
      name: "John Doe",
      companyId: 1,
    });
    expect(result).toBeNull();
  });

  it(" Test Employee Validation Function Error Handling", () => {
    validateEmp.mockReturnValue("companyId is mandatory & must be a number.");

    let result = validateEmp({
      name: "John Doe",
      companyId: "9",
    });
    expect(result).toBe("companyId is mandatory & must be a number.");
  });

  it(" Test Company Validation Function", () => {
    validateCompany.mockReturnValue(null);

    let result = validateCompany({ name: "TechCorp" });
    expect(result).toBeNull();
  });

  it("Test Company Validation Function Error Handling", () => {
    validateCompany.mockReturnValue("Name is mandatory & must be a string.");

    let result = validateCompany({ name: 90 });
    expect(result).toBe("Name is mandatory & must be a string.");
  });
});
