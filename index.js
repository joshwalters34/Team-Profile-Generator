const inquirer = require('inquirer');
const fs = require('fs');
const temp = require('./src/page-template')

function init() {
    inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the title of this README?',
        name: 'title',
        validate: validatePrompts,
      },
      {
        type: 'input',
        message: 'Describe your project.',
        name: 'description',
        validate: validatePrompts,
      },
      {
        type: 'input',
        message: 'What are the installation instructions for this project?',
        name: 'instructions',
        validate: validatePrompts,
      },
      {
          type: 'input',
          message: 'What is the usage information for this project?',
          name: 'usage',
          validate: validatePrompts,
      },
    ])
    .then (response => {
      fs.writeFile('README.md', createReadme(response)
      , (err) =>
      err ? console.log(err) : console.log("README generated")
      )
    })
  }

  init();