const express = require("express");
const cors = require("cors");
const { fetchEmployeeById, fetchEmployees } = require("./controllers/index");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/employees", async (req, res) => {
  let employees = await fetchEmployees();
  // if (!result)
  //   return res.status(404).json({ message: "No Employee Details are found." });
  return res.json({ employees });
});

app.get("/employees/details/:id", async (req, res) => {
  let employeeId = parseInt(req.params.id);
  let employee = await fetchEmployeeById(employeeId);
  // if (!result)
  //   return res
  //     .status(400)
  //     .json({ message: `No Employee found with Id: ${employeeId}` });
  return res.json({ employee });
});

module.exports = { app };
