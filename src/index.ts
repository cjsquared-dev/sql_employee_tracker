import express from 'express';
import { QueryResult } from 'pg';
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
    } catch (err) {
        console.error('Error initializing the app:', err);
        process.exit(1); // Exit if initialization fails
    }
}

async function mainMenu(): Promise<void> {
    const { action }: { action: string } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
            ],
        },
    ]);

    switch (action) {
        case 'View All Employees':
            await viewEmployees();
            break;
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        case 'View All Roles':
            await viewRoles();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'View All Departments':
            await viewDepartments();
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Quit':
            console.log('Goodbye!');
            await pool.end();  // Properly close the database connection
            return;
        default:
            console.log('Invalid action');
            break;
    }

    await mainMenu(); // Loop back to the main menu
}

async function viewEmployees(): Promise<void> {
    // Implement your logic to view employees
    pool.query('SELECT * FROM employee', (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
          console.log(result.rows);
        }
      });
}

async function addEmployee(): Promise<void> {
    // Implement your logic to add an employee
    console.log('Add Employee functionality not yet implemented.');
}

async function updateEmployeeRole(): Promise<void> {
    // Implement your logic to update an employee role
    console.log('Update Employee Role functionality not yet implemented.');
}

async function viewRoles(): Promise<void> {
    console.log('View Roles functionality not yet implemented.');
}

async function addRole(): Promise<void> {
    // Implement your logic to add a role
    console.log('Add Role functionality not yet implemented.');
}

async function viewDepartments(): Promise<void> {
    // Implement your logic to view departments
    console.log('View Departments functionality not yet implemented.');
}

async function addDepartment(): Promise<void> {
    // Implement your logic to add a department
    console.log('Add Department functionality not yet implemented.');
}

initApp(); // Start the application

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });