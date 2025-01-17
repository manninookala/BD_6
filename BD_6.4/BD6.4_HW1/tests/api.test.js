let request = require("supertest");
let http = require("http");
let { app } = require("../index");
let {
  getDepartments,
  getEmployees,
  getDepartmentById,
  getEmployeeById,
} = require("../employees");

jest.mock("../employees.js", () => ({
  ...jest.requireActual("../employees.js"),
  getDepartments: jest.fn(),
  getEmployees: jest.fn(),
  getDepartmentById: jest.fn(),
  getEmployeeById: jest.fn(),
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

  it("GET /api/employees should return 404 if no employees found", async () => {
    getEmployees.mockResolvedValue([]);

    let response = await request(server).get("/api/employees");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No employees found");
  });

  it("GET /api/employees/:id should return 404 for a non-existent Id", async () => {
    getEmployeeById.mockResolvedValue(null);

    let response = await request(server).get("/api/employees/999");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Employee not found");
  });

  it("GET /api/department should return 404 if no departments found", async () => {
    getDepartments.mockResolvedValue([]);

    let response = await request(server).get("/api/departments");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No departments found");
  });

  it("GET /api/departments/:id should return 404 for a non-existent Id", async () => {
    getDepartmentById.mockResolvedValue(null);

    let response = await request(server).get("/api/departments/999");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Department not found");
  });
});
