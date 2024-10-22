
-- Query to select all departments

SELECT id, name FROM department;

-- Query to select all roles
SELECT r.id, r.title, r.salary, d.name AS department
FROM role r
JOIN department d ON r.department_id = d.id;

-- Query to select all employees
SELECT e.id, e.first_name, e.last_name, r.title AS role, 
       d.name AS department, r.salary, 
       m.first_name AS manager_first_name, m.last_name AS manager_last_name
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- -- Query to insert a new department
-- INSERT INTO department (name) VALUES ($1);

-- -- Query to insert a new role
-- INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);

-- -- Query to insert a new employee
-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);

-- -- Query to update an employee's role
-- UPDATE employee SET role_id = $1 WHERE id = $2;