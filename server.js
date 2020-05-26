const cTable = require('console.table')
const { prompt } = require('inquirer')
const db = require('./db')

// View departments, roles, employees

// View all department
function viewDepartments() {
  db.query('SELECT * FROM employees_db.department;', (err, departments) => {
    if (err) throw err
    cTable(departments)
    init()
  })
}

// View all roles
function viewRoles() {
  db.query('SELECT * FROM employees_db.roles;', (err, roles) => {
    if (err) throw err
    cTable(roles)
    init()
  })
}

// View all employees
function viewEmployees() {
  db.query('SELECT * FROM employees_db.employee;', (err, employees) => {
    if (err) throw err
    cTable(employees)
    init()
  })
}

// Add departments, roles, employees

// add new department
function addDepartment() {
  prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What department do you want to add?'
    }
  ])
    .then((answer) => {
      db.query(`INSERT INTO department (name) VALUES ('${answer.newDepartment}')`, (err, data) => {
        if (err) throw err
        init()
      })
    })
    .catch(err => console.log(err))
}

// add new role
function addRole() {
  prompt([
    {
      type: 'input',
      name: 'newRole',
      message: 'What role do you want to add?'
    },
    {
      type: 'input',
      name: 'newSalary',
      message: 'What is the salary for this role?'
    },
    {
      type: 'input',
      name: 'newDepartmentId',
      message: 'What is the department id for this role?'
    }
  ])
    .then((answer) => {
      db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answer.newRole}', '${answer.newSalary}', '${answer.newDepartmentId}')`, (err, data) => {
        if (err) throw err
        init()
      })
    })
    .catch(err => console.log(err))
}

// add new employee
function addEmployee() {
  prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the employee?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the last name of the employee?'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'What is the role id of the employee?'
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'What is the manager id of the employee?'
    }
  ])
    .then((answer) => {
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleId}', '${answer.managerId}')`, (err, data) => {
        if (err) throw err
        init()
      })
    })
    .catch(err => console.log(err))
}

// Update employee roles
function updateRole() {
  db.query('SELECT * FROM employee', (err, data) => {
    if (err) throw err
    const employeeChoice = data.map((employee) => {
      return { name: employee.first_name, value: employee.id}
    })
    db.query('SELECT * FROM roles', (err, data) => {
      if (err) throw err
      const roleChoice = data.map((role) => {
        return { name: role.title, value: role.id }
      })
      prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Which employee do you want to update?',
          choices: employeeChoice
        },
        {
          type: 'list',
          name: 'role',
          message: 'Which role do you want to assign?',
          choices: roleChoice
        }
      ])
        .then((answer) => {
          db.query('UPDATE employee SET ? WHERE ?', [answer.employee, answer.role], (err, info) => {
            if (err) throw err
            init()
          })
        })  
    })
  })
}

function init() {
  prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'What would you like to do?',
      choices: [
        'View all department',
        'View all roles',
        'View all employees',
        'Add department',
        'Add role',
        'Add employee',
        'Update employee role',
        'Exit'
      ]
    }
  ])
    .then(({ mainMenu }) => {
      switch(mainMenu) {
        case 'View all department':
          viewDepartments()
          break
        case 'View all roles':
          viewRoles()
          break
        case 'View all employees':
          viewEmployees()
          break
        case 'Add department':
          addDepartment()
          break
        case 'Add role':
          addRole()
          break
        case 'Add employee':
          addEmployee()
          break
        case 'Update employee role':
          updateRole()
          break  
        case 'Exit':
          process.exit()
          break
      }
    })
    .catch(err => console.log(err))
}
init()