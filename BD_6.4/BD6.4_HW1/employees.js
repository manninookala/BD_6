let employees = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", departmentId: 1 },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    departmentId: 2,
  },
];

let departments = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
];

async function getEmployees() {
  return employees;
}

async function getEmployeeById(id) {
  let result = employees.find((ele) => ele.id === id);
  return result;
}

async function getDepartments() {
  return departments;
}

async function getDepartmentById(id) {
  let result = departments.find((ele) => ele.id === id);
  return result;
}

module.exports = {
  getDepartments,
  getEmployees,
  getDepartmentById,
  getEmployeeById,
};
