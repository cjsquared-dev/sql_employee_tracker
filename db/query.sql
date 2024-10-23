
-- Query to select all departments
SELECT id, name FROM department;
ORDER by id;

-- Query to select all roles
SELECT role.id, role.title, role.salary, department.name AS department_name
            FROM role
            JOIN department ON role.department_id = department.id;
            ORDER by role.id;
-- Query to select all employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name,
            role.salary, manager.first_name || ' ' || manager.last_name AS manager_name
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id;
            ORDER by employee.id;
-- Query to insert a new department
INSERT INTO department (name) VALUES ($1);

-- -- Query to insert a new role
INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);

-- -- Query to insert a new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);

-- -- Query to update an employee's role
UPDATE employee SET role_id = $1 WHERE id = $2;