//import module of common page
var CalculatorPage = require('../pages/calculator.page');

//declare the testsuite
describe('Protractor Demo App', function () {
  //declare the testcase
  it('should add one and two', function () {

    //instantiate the calculator page object (new scope)
    var calculatorPage = new CalculatorPage(browser);
    calculatorPage.openDemo();
    calculatorPage.sum(1, 2);
    calculatorPage.verifyResult('3');

    calculatorPage.sum(3, -1);
    calculatorPage.verifyResult('2');
  });
});