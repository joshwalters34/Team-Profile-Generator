const inquirer = require('inquirer');
const fs = require('fs');
const generateTeam = require('./src/page-template');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const Employee = require('./lib/Employee');
const teamMembers = [];
const path = require('path');
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

// function to start the inquirer prompts for the manager
function manager() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the team managers name?',
        name: 'managerName',
      },
      {
        type: 'input',
        message: 'What is the team managers employee id?',
        name: 'managerID',
      },
      {
        type: 'input',
        message: 'What is the team managers email address?',
        name: 'managerEmail',
        // validating that an email address is entered.  
        validate: function(email) {
          if (email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email) ) {
            return true
            } else {
              return "Please enter a valid email"
          }
        } 
      },
      {
        type: 'input',
        message: 'What is the team managers office number?',
        name: 'managerOffice',
      },

    ])
    .then(response => {
      const manager = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerOffice);
      teamMembers.push(manager);
      newMemberPrompt()
    })
}
// prompt to ask if user wants to add more team members or if they're done.  This is called in each of the member functions
function newMemberPrompt() {

  inquirer.prompt([
    {
      type: 'list',
      message: 'Would you like to enter a new team member?',
      name: 'newMember',
      choices: ['Engineer', 'Intern', 'Done'],
    },
  ])
    .then((response) => {
      switch (response.newMember) {
        case 'Engineer':
          engineerPrompt();
          break;

        case 'Intern':
          internPrompt();
          break;

        default:
          fs.writeFileSync(outputPath, generateTeam(teamMembers))
      }
    })
}
// function for new engineer prompts
function engineerPrompt() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the engineers name?',
      name: 'engineerName',
    },
    {
      type: 'input',
      message: 'What is the engineers ID?',
      name: 'engineerID',
    },
    {
      type: 'input',
      message: 'What is the engineers email address?',
      name: 'engineerEmail',
      // validating that an email address is entered. 
      validate: function(email) {
          if (email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email) ) {
            return true
            } else {
              return "Please enter a valid email"
          }
        } 
    },
    {
      type: 'input',
      message: 'What is the engineers GitHub username',
      name: 'engineerGit',
    },

  ])
    .then(response => {
      const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGit);
      teamMembers.push(engineer);
      newMemberPrompt()
    })
}
// function for new engineer prompt
function internPrompt() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the interns name?',
      name: 'internName',
    },
    {
      type: 'input',
      message: 'What is the interns ID?',
      name: 'internID',
    },
    {
      type: 'input',
      message: 'What is the interns email address?',
      name: 'internEmail',
      // validating that an email address is entered. 
      validate: function(email) {
          if (email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email) ) {
            return true
            } else {
              return "Please enter a valid email"
          }
        } 
    },
    {
      type: 'input',
      message: 'What school does the intern attend?',
      name: 'internSchool',
    },
  ])
    .then(response => {
      const intern = new Intern(response.internName, response.internID, response.internEmail, response.internSchool);
      teamMembers.push(intern);
      newMemberPrompt()
    });
}
// call the manager function to start inquirer prompts
manager();