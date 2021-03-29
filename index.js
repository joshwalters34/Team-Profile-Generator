const inquirer = require('inquirer');
const fs = require('fs');
const Temp = require('./src/page-template')

// const temp = new Temp();

function init() {
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
      {
        type: 'list',
        message: 'Would you like to enter a new team member?',
        name: 'newMember',
        choices: ['Engineer', 'Intern', 'Done'],
    },
    {
        type: 'input',
        message: 'What is the engineers name?',
        name: 'engineerName',
      //   validate: validatePrompts,
        when: (answers) => answers.newMember === 'Engineer'
    },
    {
        type: 'input',
        message: 'What is the engineers ID?',
        name: 'engineerID',
      //   validate: validatePrompts,
        when: (answers) => answers.newMember === 'Engineer'
    },
    {
        type: 'input',
        message: 'What is the engineers email address?',
        name: 'engineerEmail',
      //   validate: validatePrompts,
        when: (answers) => answers.newMember === 'Engineer'
    },
    {
        type: 'input',
        message: 'What is the engineers GitHub username',
        name: 'engineerGit',
      //   validate: validatePrompts,
        when: (answers) => answers.newMember === 'Engineer'
    },
    {
        type: 'list',
        message: 'Would you like to enter a new team member?',
        name: 'newMember',
        choices: ['Engineer', 'Intern', 'Done'],
        when: (answers) => answers.newMember === 'Engineer'
    },
        {
        type: 'input',
        message: 'What is the interns name?',
        name: 'internName',
      //   validate: validatePrompts,
        when: (answers) => answers.newMember === 'Intern'
    },
    {
        type: 'input',
        message: 'What is the interns ID?',
        name: 'internID',
      //   validate: validatePrompts,
        when: (answers) => answers.newMember === 'Intern'
    },
    {
        type: 'input',
        message: 'What is the interns email address?',
        name: 'internEmail',
      //   validate: validatePrompts,
        when: (answers) => answers.newMember === 'Intern'
    },
    {
        type: 'input',
        message: 'What school does the intern attend?',
        name: 'internSchool',
      //   validate: validatePrompts,
        when: (answers) => answers.newMember === 'Intern'
    },
    {
        type: 'list',
        message: 'Would you like to enter a new team member?',
        name: 'newMember',
        choices: ['Engineer', 'Intern', 'Done'],
    },
    ])
    .then (response => {
      fs.writeFile('index.html', Temp.generateTeam(response)
      , (err) =>
      err ? console.log(err) : console.log("HTML generated")
      )
    })
  }

  init();