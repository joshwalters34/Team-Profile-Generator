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



function manager() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the team managers name?',
        name: 'managerName',
        // validate: validatePrompts,
      },
      {
        type: 'input',
        message: 'What is the team managers employee id?',
        name: 'managerID',
        // validate: validatePrompts,
      },
      {
        type: 'input',
        message: 'What is the team managers email address?',
        name: 'managerEmail',
        // validate: validatePrompts,
      },
      {
        type: 'input',
        message: 'What is the team managers office number?',
        name: 'managerOffice',
        //   validate: validatePrompts,
      },

    ])
    .then(response => {
      const manager = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerOffice);
      teamMembers.push(manager);
      newMemberPrompt()
        // , (err) =>
        //   err ? console.log(err) : console.log("HTML generated")
    })
}

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
      // const employee = new Employee(response.newMember);
      // teamMembers.push(employee);
      switch (response.newMember) {
        case 'Engineer':
          engineerPrompt();
          break;

        case 'Intern':
          internPrompt();
          break;

        default:
          fs.writeFileSync(outputPath, generateTeam(teamMembers))
          // break;
      }
      // , (err) =>
      // err ? console.log(err) : console.log("HTML generated")
    })
}

function engineerPrompt() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the engineers name?',
      name: 'engineerName',
      //   validate: validatePrompts,
      // when: (answers) => answers.newMember === 'Engineer'
    },
    {
      type: 'input',
      message: 'What is the engineers ID?',
      name: 'engineerID',
      //   validate: validatePrompts,
      // when: (answers) => answers.newMember === 'Engineer'
    },
    {
      type: 'input',
      message: 'What is the engineers email address?',
      name: 'engineerEmail',
      //   validate: validatePrompts,
      // when: (answers) => answers.newMember === 'Engineer'
    },
    {
      type: 'input',
      message: 'What is the engineers GitHub username',
      name: 'engineerGit',
      //   validate: validatePrompts,
      // when: (answers) => answers.newMember === 'Engineer'
    },

  ])
    .then(response => {
      const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGit);
      teamMembers.push(engineer);
      newMemberPrompt()
        // , (err) =>
        //   err ? console.log(err) : console.log("HTML generated")
    })
}

function internPrompt() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the interns name?',
      name: 'internName',
      //   validate: validatePrompts,
      // when: (answers) => answers.newMember === 'Intern'
    },
    {
      type: 'input',
      message: 'What is the interns ID?',
      name: 'internID',
      //   validate: validatePrompts,
      // when: (answers) => answers.newMember === 'Intern'
    },
    {
      type: 'input',
      message: 'What is the interns email address?',
      name: 'internEmail',
      //   validate: validatePrompts,
      // when: (answers) => answers.newMember === 'Intern'
    },
    {
      type: 'input',
      message: 'What school does the intern attend?',
      name: 'internSchool',
      //   validate: validatePrompts,
      // when: (answers) => answers.newMember === 'Intern'
    },
  ])
    .then(response => {
      const intern = new Intern(response.internName, response.internID, response.internEmail, response.internSchool);
      teamMembers.push(intern);
      newMemberPrompt()
        // , (err) =>
        //   err ? console.log(err) : console.log("HTML generated")
    });
}

manager();