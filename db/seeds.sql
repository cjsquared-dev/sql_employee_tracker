-- Insert sample data into the department table
INSERT INTO department (name) VALUES
('Human Resources'),
('Engineering'),
('Sales'),
('Marketing');

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 60000, 1),
('Software Engineer', 80000, 2),
('Sales Associate', 50000, 3),
('Marketing Specialist', 55000, 4),
('DevOps Engineer', 85000, 2);

-- Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Clark', 'Kent', 1, NULL),         -- Clark is the HR Manager and has no manager
('Bruce', 'Wayne', 2, 1),           -- Bruce is a Software Engineer and reports to Clark
('Barry', 'Allen', 3, 1),           -- Barry is a Sales Associate and reports to Clark
('Arthur', 'Curry', 4, 2),          -- Arthur is a Marketing Specialist and reports to Bruce
('Diana', 'Prince', 5, 2),          -- Diana is a DevOps Engineer and reports to Bruce
('Hal', 'Jordan', 3, 2);            -- Hal is another Sales Associate and reports to Bruce

