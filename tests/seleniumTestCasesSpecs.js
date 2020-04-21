var seleniumSuite = require('../src/index');

var seleniumTestSuite = seleniumSuite.seleniumTestSuite;

seleniumTestSuite.testIt("Title", function () {
    console.log("Hi there, my first case");
});

seleniumTestSuite.only("This is the only thing", function () {
    console.log("The only test case to be run");
})

seleniumTestSuite.suppress("This is a suppressed function", function () {
    console.log("Just a suppressed test case");
})
