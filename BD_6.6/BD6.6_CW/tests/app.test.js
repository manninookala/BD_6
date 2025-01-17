let request = require("supertest");
let http = require("http");
let { app } = require("../index");
let { fetchEmployeeById, fetchEmployees } = require("../controllers/index");

jest.mock("../controllers/index", () => ({
  ...jest.requireActual("../controllers/index"),
  fetchEmployeeById: jest.fn(),
  fetchEmployees: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controller Function Test-cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Fetch all the employees", async () => {
    let mockData = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];
    fetchEmployees.mockResolvedValue(mockData);
    let result = await fetchEmployees();
    expect(result).toEqual(mockData);
    expect(result.length).toBe(3);
  });

  it("Fetch an employee by its Id", async () => {
    let mockData = {
      employeeId: 2,
      name: "Priya Singh",
      email: "priya.singh@example.com",
      departmentId: 2,
      roleId: 2,
    };
    fetchEmployeeById.mockResolvedValue(mockData);

    let result = await fetchEmployeeById(2);
    expect(result).toEqual(mockData);
  });
});

describe("API Endpoint Test-cases", () => {
  it("GET /employees Fetch all employees", async () => {
    let employees = await request(server).get("/employees");
    expect(employees.status).toBe(200);
    expect(employees.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: "Priya Singh",
          email: "priya.singh@example.com",
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: "Ankit Verma",
          email: "ankit.verma@example.com",
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(employees.body.employees.length).toBe(3);
  });

  it("GET /employees/details/:id", async () => {
    let employee = await request(server).get("/employees/details/1");
    console.log(employee.body);
    expect(employee.status).toBe(200);
    expect(employee.body).toEqual({
      employee: {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
    });
  });
});
