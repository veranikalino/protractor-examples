// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //specs: ['e2e/specs/calculator.spec.js','e2e/specs/todo.spec.js'],

  suites: {
    calculatorsuit: ['e2e/specs/calculator.spec.js'],
    todosuit: ['e2e/specs/todo.spec.js']

  },
  directConnect: true
}

