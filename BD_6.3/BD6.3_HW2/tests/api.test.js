let request = require("supertest");
let {
  app,
  getAllEmployees,
  getEmployeeById,
  addNewEmployee,
} = require("../index");
let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addNewEmployee: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Employees API Endpoint Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Fetch all the employees", async () => {
    const mockEmps = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Engineering",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Marketing",
      },
    ];
    getAllEmployees.mockResolvedValue(mockEmps);

    let result = await request(server).get("/employees");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmps);
  });

  it("Fetch an employee by Id", async () => {
    const mockEmp = {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      department: "Marketing",
    };
    getEmployeeById.mockResolvedValue(mockEmp);

    let result = await request(server).get("/employees/details/2");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmp);
  });

  it("Fetch undefined by a non-existent Id", async () => {
    getEmployeeById.mockResolvedValue(undefined);

    let result = await request(server).get("/employees/details/33");
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({});
  });

  it("Add a new employee to the list", async () => {
    let mockEmp = {
      id: 4,
      name: "newName",
      email: "new.emailh@example.com",
      department: "newDept",
    };
    addNewEmployee.mockResolvedValue(mockEmp);

    let result = await request(server).post("/employees/new").send({
      id: 4,
      name: "newName",
      email: "new.emailh@example.com",
      department: "newDept",
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmp);
  });
});
