let employees = [
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

async function fetchEmployees() {
    return employees;
}

async function fetchEmployeeById(id) {
    let result = employees.find((ele) => ele.employeeId === id);
    return result;
}

module.exports = { fetchEmployeeById, fetchEmployees };
