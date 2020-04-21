var seleniumTestSuite = require('../src/index');

var seleniumRunner = seleniumTestSuite.seleniumRunner;

seleniumRunner.run('../**/*Test*.js');