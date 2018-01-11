var CommonPage = function (browser){
    'use strict;'
    
    var vm= this;
    vm.openDemo = openDemo;
    vm.verifyTitle = verifyTitle;
    vm.sum = sum;
    vm.verifyResult = verifyResult;
    return vm;

    //////////////////////////////////////

    function openDemo() {
        browser.get('http://juliemr.github.io/protractor-demo/');
    }

    function verifyTitle(title){
        expect(browser.getTitle()).toEqual(title);
    }
    
    function sum(a,b){
        element(by.model('first')).sendKeys(a);  // <input ng-model="first">
        element(by.model('second')).sendKeys(b); // <input ng-model="second">
    
        element(by.id('gobutton')).click(); // <input type=button id=gobutton
    }

    function verifyResult(result){
        var latestExpr = element(by.binding('latest'));
        var latestText = latestExpr.getText();
        expect(latestText).toEqual(result); 

    }
};
module.exports= CommonPage; 