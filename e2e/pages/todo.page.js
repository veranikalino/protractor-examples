//define the function that represents TodoPage
var TodoPage = function (browser) {
    'use strict;'
    //save scope
    var vm = this;
    //declare public methods
    vm.open = open;
    vm.addTodo = addTodo;
    vm.editTodoItem = editTodoItem;
    vm.clickItemCheckbox = clickItemCheckbox;
    vm.clickFilterAll = clickFilterAll;
    vm.clickFilterActive = clickFilterActive;
    vm.clickFilterCompleted = clickFilterCompleted;
    vm.clickFilterClearCompleted = clickFilterClearCompleted;
    vm.clickToggleAll = clickToggleAll;
    vm.hoverItem = hoverItem;
    vm.hoverAllFilters = hoverAllFilters;
    vm.reload = reload;
    vm.removeTodo = removeTodo;

    vm.verifyTitle = verifyTitle;
    vm.verifyFiltersAreHidden = verifyFiltersAreHidden;
    vm.verifyFiltersAreVisible = verifyFiltersAreVisible;
    vm.verifyItemIsTodo = verifyItemIsTodo;
    vm.verifyItemIsCompleted = verifyItemIsCompleted;
    vm.verifyItemsAreCompleted = verifyItemsAreCompleted;
    vm.verifyTodoCounter = verifyTodoCounter;
    vm.verifyTodoCounterEqualsItemsListSize = verifyTodoCounterEqualsItemsListSize;
    vm.verifyItemsListSize = verifyItemsListSize;
    vm.verifyRemoveIconHidden = verifyRemoveIconHidden;
    vm.verifyRemoveIconVisible = verifyRemoveIconVisible;
    vm.verifyToggleAllHidden = verifyToggleAllHidden;
    vm.verifyToggleAllVisible = verifyToggleAllVisible;


    return vm;

    //define the method functions
    function open() {
        browser.get('http://todomvc.com/examples/angularjs/#/');
    }

    function verifyTitle(title) {
        //how to get? console> document.title
        expect(browser.getTitle()).toEqual(title);
    }

    function verifyTodoCounter(count) {
        //remainingCount
        var countExpr = element(by.binding('remainingCount'));
        var text = countExpr.getText();
        expect(text).toEqualAsString(count);
    }

    function addTodo(str) {
        //action
        element(by.model('newTodo')).sendKeys(str, protractor.Key.ENTER);
    }

    function clickItemCheckbox(labelTxt) {
        var locatorStr = prepareLocatorString([labelTxt], [checkboxLocator, findLabelByText]);
        var elementFinder = element(by.js(locatorStr));
        elementFinder.click();

        function checkboxLocator(labelTxt) {
            var labelElement = findLabelByText(labelTxt);
            if (labelElement) {
                var checkboxs = labelElement.parentElement.getElementsByTagName('input');
                return checkboxs && checkboxs.length > 0 ? checkboxs[0] : null;
            }
        }
    }

    function clickFilterAll() {
        var elementFinder = element(by.partialLinkText('All'));
        elementFinder.click();
    }

    function clickFilterActive() {
        var elementFinder = element(by.partialLinkText('Active'));
        elementFinder.click();
    }

    function clickFilterCompleted() {
        var elementFinder = element(by.partialLinkText('Completed'));
        elementFinder.click();
    }

    function findTodoListItembyText(labelTxt) {
        var locatorStr = prepareLocatorString([labelTxt], [listItemLocator, findLabelByText]);
        var elementFinder = element(by.js(locatorStr));
        return elementFinder;

        function listItemLocator(labelTxt) {
            var labelElement = findLabelByText(labelTxt);
            if (labelElement) {
                return labelElement.parentElement.parentElement;
            }
        }
    }

    function removeTodo(labelTxt) {
        var elementFinder = findRemoveIcon(labelTxt);
        elementFinder.click();
    }

    function verifyFiltersAreHidden() {
        var elementFinder = element(by.id('filters'));
        expect(elementFinder.isDisplayed()).toBe(false);
    }

    function verifyFiltersAreVisible() {
        var elementFinder = element(by.id('filters'));
        expect(elementFinder.isDisplayed()).toBe(true);

    }

    function verifyItemIsTodo(labelTxt) {
        var elementFinder = findTodoListItembyText(labelTxt);
        //inverse of verifyItemIsCompleted by using '.not.'
        expect(elementFinder.getAttribute('class')).not.toContain('completed');
    }

    function verifyItemIsCompleted(labelTxt) {
        var elementFinder = findTodoListItembyText(labelTxt);
        expect(elementFinder.getAttribute('class')).toContain('completed');
    }

    function findLabelByText(labelTxt) {
        //find all labels
        var labels = document.querySelectorAll('#todo-list .view label');
        for (var idx = 0; idx < labels.length; ++idx) {
            //extract text of the label DOM element
            var text = labels[idx].innerText || labels[idx].txtContent;
            if (text === labelTxt) {
                return labels[idx];
            }
        }
    }

    function verifyTodoCounterEqualsItemsListSize() {
        //remainingCount
        var countExpr = element(by.binding('remainingCount'));
        var todos = element.all(by.css('#todo-list li'));
        expect(countExpr.getText()).toEqualAsString(todos.count());
    }


    function verifyItemsListSize(count) {
        var todos = element.all(by.css('#todo-list li'));
        expect(todos.count()).toEqualAsString(count);
    }

    function clickToggleAll() {
        var elementFinder = element(by.css('#toggle-all'));
        elementFinder.click();
    }

    function verifyItemsAreCompleted(count) {
        var todos = element.all(by.css('#todo-list li.completed'));
        expect(todos.count()).toEqualAsString(count);
    }

    function clickFilterClearCompleted() {
        var elementFinder = element(by.partialButtonText('Clear completed'));
        elementFinder.click();
    }

    function verifyRemoveIconHidden(labelTxt) {
        var elementFinder = findRemoveIcon(labelTxt);
        //var content = getAfterPseudoCssValue(elementFinder, ':after', 'content');
        //expect(content).toEqual('"×"');
        var content = getAfterPseudoCssValue(elementFinder, ':before/:after', 'display');
        expect(content).toEqual('block');
    }
    function verifyRemoveIconVisible(labelTxt) {
        var elementFinder = findRemoveIcon(labelTxt);
        var content = getAfterPseudoCssValue(elementFinder, ':before/:after', 'display');
        expect(content).toEqual('block');
    }

    function findRemoveIcon(labelTxt) {
        //remove icon is invisible unless you hover with mouse
        var elementFinder = hoverItem(labelTxt);
        //find it finally
        var elementFinder2 = elementFinder.element(by.tagName('button'));
        return elementFinder2;
    }

    function hoverItem(labelTxt) {
        //remove icon is invisible unless you hover with mouse
        var elementFinder = findTodoListItembyText(labelTxt);
        //hover
        browser.actions().mouseMove(elementFinder).perform();
        return elementFinder;
    }

    function hoverAllFilters() {
        var elementFinder = element(by.css('#toggle-all'));
        browser.actions().mouseMove(elementFinder).perform();
    }

    function reload() {
        browser.refresh();
    }

    function verifyToggleAllHidden() {
        var elementFinder = element(by.css('#toggle-all'));
        expect(elementFinder.isDisplayed()).toBe(false);
    }

    function verifyToggleAllVisible() {
        var elementFinder = element(by.css('#toggle-all'));
        expect(elementFinder.isDisplayed()).toBe(true);
    }

    function findTodoItemEditField(currentLabelTxt) {
        var locatorStr = prepareLocatorString([currentLabelTxt], [editFieldLocator, findLabelByText]);
        var elementFinder = element(by.js(locatorStr));
        return elementFinder;

        function editFieldLocator(currentLabelTxt) {
            var labelElement = findLabelByText(currentLabelTxt);
            if (labelElement) {
                var inputs = labelElement.parentElement.parentElement.getElementsByTagName('input');
                return inputs && inputs.length > 0 ? inputs[1] : null;
            }
        }
    }

    function editTodoItem(currentLabelTxt, newLabelTxt) {
        //find todo item list
        var elementFinder = findTodoListItembyText(currentLabelTxt);
        //double click it
        browser.actions().mouseMove(elementFinder).doubleClick().perform();

        //find the editable input field
        var elementFinder2 = findTodoItemEditField(currentLabelTxt);
        //double click it
        browser.actions().mouseMove(elementFinder2).doubleClick().perform();
        //fill in the new label text
        elementFinder2.sendKeys(newLabelTxt, protractor.Key.ENTER);
    }


    function prepareLocatorString(parametersList, functionsList) {
        var locationFn = functionsList[0];
        var params = prepareParametersString(parametersList);

        var str = '';
        //print wrapperLocatorFn function
        str += 'return (function wrapperLocatorFn() {';
        //print the call of the location function using all given parameters
        str += 'return ' + locationFn.name + '(' + params + ');\n';
        //print all the dependant functions
        for (var idx = 0; idx < functionsList.length; idx++) {
            str += functionsList[idx].toString();
            str += '\n';
        }
        str += '})()';
        return str;

        function prepareParametersString() {
            var paramsStr = '';
            for (var idx = 0; idx < parametersList.length; idx++) {
                var param = parametersList[idx];
                if (typeof (param) === 'string') {
                    paramsStr += '"' + param + '"';
                } else {
                    paramsStr += param.toString();
                }
                if (idx + 1 !== parametersList.length) {
                    paramsStr += ','
                }
            }
            return paramsStr;
        }
    }

    function getAfterPseudoCssValue(elementFinder, pseudoCssClass, pseudoCssAttribute) {
        var scriptTxt =
            'return window.getComputedStyle(' +
            'arguments[0], \'' + pseudoCssClass + '\'' +
            ').getPropertyValue(\'' + pseudoCssAttribute + '\')';

        return browser.executeScript(scriptTxt, elementFinder);
    }

}

//export the TodoPage function
module.exports = TodoPage;