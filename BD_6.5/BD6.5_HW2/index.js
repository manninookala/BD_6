let express = require("express");

const app = express();
app.use(express.json());

let employees = [];
let companies = [];

function validateEmp(data) {
  if (!data.name || typeof data.name !== "string") {
    return "Name is mandatory & must be a string.";
  }
  if (!data.companyId || typeof data.companyId !== "number") {
    return "companyId is mandatory & must be a number.";
  }
  return null;
}

function validateCompany(data) {
  if (!data.name || typeof data.name !== "string") {
    return "Name is mandatory & must be a string.";
  }
  return null;
}

app.post("/api/employees", (req, res) => {
  const error = validateEmp(req.body);
  if (error) return res.status(400).json(error);
  let employee = { id: employees.length + 1, ...req.body };
  employees.push(employee);
  return res.status(201).json(employee);
});

app.post("/api/companies", (req, res) => {
  const error = validateCompany(req.body);
  if (error !== null) return res.status(400).json(error);
  let comapny = { id: companies.length + 1, ...req.body };
  companies.push(comapny);
  return res.status(201).json(comapny);
});

module.exports = { app, validateCompany, validateEmp };
