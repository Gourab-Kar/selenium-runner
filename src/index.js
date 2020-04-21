var fileFinder = require('find-specific-files');
var logger = require('./logger');
var path = require('path');

//actual list of test cases
var testCases = [];

//priority List
var priorityTestCases = [];

//suppressed cases list
var suppressedTestCases = [];

var runThisArrayOFTestCases = function (testCasesArr) {
    for(var i=0; i<testCasesArr.length; i++) {
        var currentTestCase = testCasesArr[i];

        logger.logInfo(currentTestCase.title);
        currentTestCase.fn();
        console.log("");
    }
}

var seleniumRunner = function () {
    this.run = function (startPath) {
        logger.logNotify("Running the selenium test runner.");
        
        var rootPath = path.resolve(process.mainModule.filename, '../');
        rootPath = rootPath.replace(/\\/g, '/');

        var filePaths = fileFinder.findFiles(startPath, rootPath);

        if(filePaths.length>0) {
            for(var i=0; i<filePaths.length; i++) {
                require(filePaths[i]);
            }
        }

        if(priorityTestCases.length > 0) {
            runThisArrayOFTestCases(priorityTestCases)
        } else if (testCases.length > 0){
            runThisArrayOFTestCases(testCases)
        }
    }

    if(seleniumRunner.caller != seleniumRunner.getInstance){
        throw new Error("This object cannot be instanciated");
    }
};

var seleniumTestSuite = function seleniumTestSuite(){
    this.testIt = function (title, fn) {
        testCases.push({
            title: title,
            fn: fn
        })
    }

    this.only = function (title, fn) {
        priorityTestCases.push({
            title: title,
            fn: fn
        })
    }

    this.suppress = function (title, fn) {
        suppressedTestCases.push({
            title: title,
            fn: fn
        })
    }

    if(seleniumTestSuite.caller != seleniumTestSuite.getInstance){
        throw new Error("This object cannot be instanciated");
    }
}

/* ************************************************************************
seleniumRunner CLASS DEFINITION
************************************************************************ */
seleniumRunner.instance = null;

seleniumRunner.getInstance = function () {
    if(this.instance === null) {
        this.instance = new seleniumRunner();
    }

    return this.instance;
}

/* ************************************************************************
seleniumTestSuite CLASS DEFINITION
************************************************************************ */
seleniumTestSuite.instance = null;

/**
 * seleniumTestSuite getInstance definition
 * @return seleniumTestSuite class
 */
seleniumTestSuite.getInstance = function(){
    if(this.instance === null){
        this.instance = new seleniumTestSuite();
    }
    return this.instance;
}



module.exports = {
    seleniumTestSuite: seleniumTestSuite.getInstance(),
    seleniumRunner: seleniumRunner.getInstance()
}