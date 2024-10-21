import fs from 'fs';
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

//create a function to 



function performActions() {
    inquirer.prompt([
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
                'Quit']
        }
    ]).then(({ action }) => {
        switch (action) {
            case 'View All Employees':
                this.viewAllEmployees();
                break;
            case 'Add Employee':
                this.addEmployees();
                break;
            case 'Update Employee Role':
                this.updateEmployeeRole();
                break;
            case 'View All Roles':
                this.viewAllRoles();
                break;
            case 'Add Role':
                this.addRole();
                break;
            case 'View All Departments':
                this.viewAllDepartments();
                break;
            case 'Add Department':
                this.addDepartment();
                break;
            case 'Quit':
                console.log('Goodbye!');
                process.exit();
                break;
            
            default:
                console.log('Invalid action');
        }
    });
}

performActions();