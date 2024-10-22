import inquirer from 'inquirer';
import chalk from 'chalk';



const title = `
${chalk.blue('  ____   ___  _         _____                 _                            ')}
${chalk.blue(' / ___| / _ \\| |       | ____|_ __ ___  _ __ | | ___  _   _  ___  ___      ')}
${chalk.blue(' \\___ \\| | | | |       |  _| | \'_ ` _ \\| \'_ \\| |/ _ \\| | | |/ _ \\/ _ \\     ')}
${chalk.blue('  ___) | |_| | |___    | |___| | | | | | |_) | | (_) | |_| |  __/  __/     ')}
${chalk.blue(' |____/_\\__\\_\\_____|___|_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|____ ')}
${chalk.blue(' |  \\/  | __ _ _ _|_____|_  __ _  ___ _|_|            |___/         |_____|')}
${chalk.blue(' | |\\/| |/ _\` | \'_ \\ / _\` |/ _\` |/ _ \\ \'__|                                ')}
${chalk.blue(' | |  | | (_| | | | | (_| | (_| |  __/ |                                   ')}
${chalk.blue(' |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|                                   ')}
${chalk.blue('                           |___/                                           ')}
`;

console.log(title);

async function mainMenu() {
    const {action} = await inquirer.prompt([
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
                db.end();
                return;
            
            default:
                console.log('Invalid action');
                break;
        }
        
}
mainMenu();

//create a function to view all employees
async function viewEmployees() {
    const employees = await client.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;
    `);
    console.table(employees.rows);
    mainMenu();
}


