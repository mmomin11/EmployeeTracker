// require the necessary packages (mysql, inquirer)
const mysql = require("mysql");
const inquirer = require("inquirer");
const db = require(".");

// create connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // PORT
    port: 3306,
    // username
    user: "root",
    // password and database
    password: "password",
    database: "employees_DB"
});
// actually connect to the server you have created
connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    initialQuestions();
});

// function that prompts the user to select what they plan to do. 
function initialQuestions() {
    inquirer
        .prompt({
            type: "list",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee roles",
                "Quit"
            ],
            message: "What would you like to do?",
            name: "option"
        })
        .then(function(result) {
            console.log("You have entered " + result.option);
            
            // run a then function that takes in the answer selection and goes to the appropraite prompt (View Employees, Add Employee, delete employee)
            switch (result.option) {
                case "Add department":
                  addDepartment();
                  break;
                case "Add role":
                  addRole();
                  break;
                case "Add employee":
                  addEmployee();
                  break;
                case "View departments":
                  viewDepartment();
                  break;
                case "View roles":
                  viewRoles();
                  break;
                case "View employees":
                  viewEmployees();
                  break;
                case "Update employee role":
                  updateEmployee();
                  break;
                default:
                  quit();
              }
        })
}



// function to view employees


// function to add employees that prompts first and last name of employee, then role, and then manager of employee. 


// function to delete employees which has a choice option. 