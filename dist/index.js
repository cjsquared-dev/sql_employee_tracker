import express from 'express';
import { pool, connectToDb } from './connection.js'; // Assuming pool and connectToDb are set up correctly in connection.js
import inquirer from 'inquirer';
import chalk from 'chalk';
const PORT = process.env.PORT || 3001;
const app = express();
await connectToDb(); // Ensure the database connection is established
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
async function initApp() {
    try {
        await mainMenu(); // Start the main menu
    }
    catch (err) {
        console.error('Error initializing the app:', err);
        process.exit(1); // Exit if initialization fails
    }
}
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
async function viewEmployees() {
    pool.query('SELECT * FROM employee', (err, result) => {
        if (err) {
            console.error('Error viewing employees:', err);
        }
        else if (result) {
            console.log(result.rows);
            mainMenu();
        }
    });
}
async function addEmployee() {
    // Implement your logic to add an employee
    console.log('Add Employee functionality not yet implemented.');
    mainMenu();
}
async function updateEmployeeRole() {
    // Implement your logic to update an employee role
    console.log('Update Employee Role functionality not yet implemented.');
    mainMenu();
}
async function viewRoles() {
    console.log('View Roles functionality not yet implemented.');
    mainMenu();
}
async function addRole() {
    // Implement your logic to add a role
    console.log('Add Role functionality not yet implemented.');
    mainMenu();
}
async function viewDepartments() {
    // Implement your logic to view departments
    console.log('View Departments functionality not yet implemented.');
    mainMenu();
}
async function addDepartment() {
    // Implement your logic to add a department
    console.log('Add Department functionality not yet implemented.');
    mainMenu();
}
initApp(); // Start the application
app.listen(PORT, () => {
    console.log(` \n Server running on port ${PORT}`);
});