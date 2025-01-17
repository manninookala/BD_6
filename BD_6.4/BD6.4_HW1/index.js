let express = require("express");
let {
  getDepartments,
  getEmployees,
  getDepartmentById,
  getEmployeeById,
} = require("./employees");

const app = express();
app.use(express.json());

//1
app.get("/api/employees", async (req, res) => {
  try {
    let result = await getEmployees();
    if (result.length === 0) {
      return res.status(404).json({ error: "No employees found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//2
app.get("/api/employees/:id", async (req, res) => {
  try {
    let empId = parseInt(req.params.id);
    let result = await getEmployeeById(empId);
    if (!result) return res.status(404).json({ error: "Employee not found" });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//3
app.get("/api/departments", async (req, res) => {
  try {
    let result = await getDepartments();
    if (result.length === 0)
      return res.status(404).json({ error: "No departments found" });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//4
app.get("/api/departments/:id", async (req, res) => {
  try {
    let deptId = parseInt(req.params.id);
    let result = await getDepartmentById(deptId);
    if (!result) return res.status(404).json({ error: "Department not found" });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
