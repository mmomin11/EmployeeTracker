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
};

// function after Add department selection
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department",
      name: "depName"
    })
    .then(function(answer) {
      connection.query("INSERT INTO department VALUES ?", answer.depName, function(err) {
        if (err) throw err;
        console.log("Your department has been added");
      })
    })
}

// function to add role
function addRole() {
  inquirer
    .prompt([{
      type: "input",
      message: "What role needs to be added?",
      name: "rolename"
    },
    {
      type: "input",
      message: "Approximate salary for this role?",
      name: "salary"
    },
    {
      type: "input",
      message: "What is the department ID number?",
      name: "deptnumber"
    }
  ])
  .then (function(answer) {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.rolename, answer.salary, answer.deptnumber], function(err, res) {
      if (err) throw err;
      console.log(res);
      initialQuestions();
    })
  })
};

// function to add employees that prompts first and last name of employee, then role, and then manager of employee. 
function addEmployee() {
    inquirer
      .prompt([{
        type: "input",
        message: "What is the first name?",
        name: "firstname"
      },
      {
        type: "input",
        message: "What is the last name?",
        name: "lastname"
      },
      {
        type: "input",
        message: "What is the role ID number?",
        name: "rolenumber"
      },
      {
        type: "input",
        message: "What is the manager ID number?",
        name: "managernumber"
      }
    ])
    .then (function(answer) {
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstname, answer.lastname, answer.rolenumber, answer.managernumber], function(err, res) {
        if (err) throw err;
        console.log(res);
        initialQuestions();
      })
    });
};

// function to view department
function viewDepartment() {
  let query = "SELECT id, name FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
    initialQuestions();
  })
}

// function to view roles
function viewRoles() {
  let query = "SELECT id, title FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
    initialQuestions();
  })
};

// function to view employee
function viewEmployees() {
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
    initialQuestions();
  })
};


// function to delete employees which has a choice option. 
function updateEmployee() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
  inquirer
    .prompt([
      {
        type: "list",
        choices: function() {
          let choiceArray = [];
          for (let i = 0; i < results.length; i++) {
            choiceArray.push(results[i].first_name, results[i].last_name);
          };
          return choiceArray;
        },
        message: "Which employee would you like to update?",
        name: "empupdate"
      },
      {
        type: "input",
        message: "What is the new role id?",
        name: "updatefield"
      }
    ]).then(function(answer) {
      connection.query("UPDATE employee SET role_id=? WHERE first_name=? AND last_name=?", [answer.updatefield, answer.empupdate.split(" ")], function(err, res) {
        if (err) throw err;
        console.log("Updated your role");
        initialQuestions();
      })
    })
  })
};

