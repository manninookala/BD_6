let express = require("express");

const app = express();
app.use(express.json());

let employees = [
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

async function getAllEmployees() {
  return employees;
}

async function getEmployeeById(id) {
  let result = employees.find((ele) => ele.id === id);
  return result;
}

async function addNewEmployee(data) {
  let newEmp = { id: employees.length + 1, ...data };
  employees.push(newEmp);
  return newEmp;
}

app.get("/employees", async (req, res) => {
  let result = await getAllEmployees();
  return res.status(200).json(result);
});

app.get("/employees/details/:id", async (req, res) => {
  let empId = parseInt(req.params.id);
  let result = await getEmployeeById(empId);
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({});
  }
});

app.post("/employees/new", async (req, res) => {
  let newEmp = req.body;
  let result = await addNewEmployee(newEmp);
  return res.status(200).json(result);
});

module.exports = { app, getAllEmployees, getEmployeeById, addNewEmployee };
