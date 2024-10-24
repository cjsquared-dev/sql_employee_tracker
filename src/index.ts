import express from 'express';
import { pool, connectToDb } from './connection.js'; // Assuming pool and connectToDb are set up correctly in connection.js
import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table3';

const PORT = process.env.PORT || 3001;
const app = express();

await connectToDb(); // Ensure the database connection is established


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Display the title of the application
const title = `
${chalk.blue('  ____   ___  _         _____                 _                            ')}
${chalk.blue(' / ___| / _ \\| |       | ____|_ __ ___  _ __ | | ___  _   _  ___  ___      ')}
${chalk.blue(' \\___ \\| | | | |       |  _| | \'_ \` _ \\| \'_ \\| |/ _ \\| | | |/ _ \\/ _ \\     ')}
${chalk.blue('  ___) | |_| | |___    | |___| | | | | | |_) | | (_) | |_| |  __/  __/     ')}
${chalk.blue(' |____/_\\__\\_\\_____|___|_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|____ ')}
${chalk.blue(' |  \\/  | __ _ _ _|_____|_  __ _  ___ _|_|            |___/         |_____|')}
${chalk.blue(' | |\\/| |/ _\` | \'_ \\ / _\` |/ _\` |/ _ \\ \'__|                                ')}
${chalk.blue(' | |  | | (_| | | | | (_| | (_| |  __/ |                                   ')}
${chalk.blue(' |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|                                   ')}
${chalk.blue('                           |___/                                           ')}
`;

console.log(title);

// Initialize the application
async function initApp() {
    try {
        await mainMenu(); // Start the main menu
    } catch (err) {
        console.error('Error initializing the app:', err);
        process.exit(1); // Exit if initialization fails
    }
}


// Inquirer main menu prompting the user for the next action
const mainMenu = async () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Quit',
                ],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Quit':
                    console.log('Exiting application.');
                    process.exit(0);
                default: {
                    console.log('Invalid choice');
                    break;
                }
            }
        });
};

// Function to view all employees
async function viewEmployees(): Promise<void> {
    try {
        const result = await pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name,
            role.salary, manager.first_name || ' ' || manager.last_name AS manager_name
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id
            ORDER BY employee.id ASC;`);
        
        const table = new Table({
          head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'],
        });
    
        // Add each row to the table
        result.rows.forEach(row => {
          table.push([row.id, row.first_name, row.last_name, row.title, row.department_name, row.salary, row.manager_name]);
        });
    
        console.log(table.toString());  // Display the table in the console
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
      mainMenu();
    }
    
// Function to add an employee
async function addEmployee(): Promise<void> {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: `Enter the employee's first name:`,
            },
            {
                type: 'input',
                name: 'last_name',
                message: `Enter the employee's last name:`,
            },
            {
                type: 'list',
                name: 'role_id',
                message: `Enter the employee's role:`,
                choices: async () => {
                    const result = await pool.query(`SELECT id, title FROM role;`);
                    return result.rows.map(role => ({
                        name: role.title,
                        value: role.id }));
                }
            },

        { 
            type: 'list',
            name: 'manager_id',
            message: `Enter the employee's manager:`,
            choices: async () => {
                const result = await pool.query(`SELECT id, first_name, last_name FROM employee;`);
                const managers = result.rows.map(manager => ({
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id,
                }));
                managers.unshift({ name: 'None', value: null });
                return managers;
            },
        },
    ]);
    // Insert the new employee into the database
    await pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ($1, $2, $3, $4);`, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);

        console.log(`Employee ${answers.first_name} ${answers.last_name} added successfully.`);
    } catch (err) {
        console.error('Error adding employee:', err);
    }
    mainMenu();
}

// Function to update an employee role
async function updateEmployeeRole(): Promise<void> {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: `Select the employee whose role you want to update:`,
                choices: async () => {
                    const result = await pool.query(`SELECT id, first_name, last_name FROM employee;`);
                    return result.rows.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id }));
                }
            },
            {
                type: 'list',
                name: 'role_id',
                message: `Select the employee's new role:`,
                choices: async () => {
                    const result = await pool.query(`SELECT id, title FROM role;`);
                    return result.rows.map(role => ({
                        name: role.title,
                        value: role.id }));
                }
            },
        ]);
        // Update the employee's role in the database
        await pool.query(`UPDATE employee
            SET role_id = $1
            WHERE id = $2;`, [answers.role_id, answers.employee_id]);

        console.log(`Employee role updated successfully.`);
    }
    catch (err) {
        console.error('Error updating employee role:', err);
    }
    mainMenu();
}
// Function to view all roles
async function viewRoles(): Promise<void> {
    try {
        const result = await pool.query(`SELECT role.id, role.title, role.salary, department.name AS department_name
            FROM role
            JOIN department ON role.department_id = department.id
            ORDER BY department.id ASC;`);

        const table = new Table({
            head: ['Title', 'Salary', 'Department'],
        });

        // Add each row to the table
        result.rows.forEach(row => {
            table.push([row.title, row.salary, row.department_name]);
        });

        console.log(table.toString());  // Display the table in the console
    } catch (err) {
        console.error('Error fetching roles:', err);
    }
    mainMenu();
}
// Function to add a role
async function addRole(): Promise<void> {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'role_title',
                message: `What is the name of the role?`,
            },
            {
                type: 'input',
                name: 'salary',
                message: `What is the salary of the role?`,
                validate: (input) => !isNaN(input) || 'Please enter a valid number',
            },
            {
                type: 'list',
                name: 'department_id',
                message: `Which department does the role belong to?`,
                choices: async () => {
                    const result = await pool.query(`SELECT id, name FROM department;`);
                    return result.rows.map(dept => ({
                        name: dept.name,
                        value: dept.id }));
                }
            },
    ]);
    // Insert the new role into the database
    await pool.query(`INSERT INTO role (title, salary, department_id)
        VALUES ($1, $2, $3);`, [answers.role_title, answers.salary, answers.department_id]);

        console.log(`Added ${answers.role_title} to the database successfully.`);
    } catch (err) {
        console.error('Error adding role:', err);
    }
    mainMenu();
}
// Function to view all departments
async function viewDepartments(): Promise<void> {
    try {
        const result = await pool.query(`SELECT id, name
            FROM department;
            `);
        
        const table = new Table({
          head: ['ID', 'Name'],
        });
    
        // Add each row to the table
        result.rows.forEach(row => {
          table.push([row.id, row.name]);
        });
    
        console.log(table.toString());  // Display the table in the console
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
      mainMenu();
    }
// Function to add a department
async function addDepartment(): Promise<void> {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_name',
                message: `Enter the name of the department:`,
            },
        ]);
        // Insert the new department into the database
        await pool.query(`INSERT INTO department (name)
            VALUES ($1);`, [answers.department_name]);

        console.log(`Added ${answers.department_name} to the database successfully.`);
    } catch (err) {
        console.error('Error adding department:', err);
    }
    mainMenu();
}

initApp(); // Start the application

app.listen(PORT, () => {
    console.log(` \n Server running on port ${PORT}`);
  });