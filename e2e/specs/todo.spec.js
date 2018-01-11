//import module of todo page
var TodoPage = require('../pages/todo.page');
var todoPage = new TodoPage(browser);
var SHOP = 'shopping';

beforeEach(function () {
  registerMatchers();

  //instantiate the todo page object (new scope)
  todoPage.open();
  todoPage.verifyTitle("AngularJS • TodoMVC");
});

afterEach(function () {
  clearBrowserCache();
  //browser.restart();
});

//declare the testsuite
describe('Protractor Todo App', function () {

  //declare the testcase
  it('add, complete and remove the TODO SHOP', function () {
    todoPage.verifyFiltersAreHidden();
    todoPage.addTodo(SHOP);
    todoPage.verifyFiltersAreVisible();
    todoPage.verifyTodoCounter(1);
    todoPage.verifyTodoCounterEqualsItemsListSize();
    todoPage.clickItemCheckbox(SHOP);
    todoPage.verifyItemIsCompleted(SHOP);
    todoPage.clickFilterActive();
    todoPage.verifyItemsListSize(0);
    todoPage.clickFilterCompleted();
    todoPage.verifyItemsListSize(1);
    todoPage.clickFilterAll();
    todoPage.verifyItemsListSize(1);
    todoPage.clickItemCheckbox(SHOP);
    todoPage.verifyItemIsTodo(SHOP);
    todoPage.removeTodo(SHOP);
    todoPage.verifyItemsListSize(0);
    todoPage.verifyFiltersAreHidden();
  });

  it('testcase for toggle all filter', function () {
    var SHOP1 = 'shopping1';
    var SHOP2 = 'shopping2';
    var SHOP3 = 'shopping3';
    todoPage.addTodo(SHOP1);
    todoPage.addTodo(SHOP2);
    todoPage.verifyToggleAllVisible();
    todoPage.clickToggleAll();
    todoPage.verifyItemsAreCompleted(2);
    todoPage.verifyItemsListSize(2);
    todoPage.addTodo(SHOP3);
    todoPage.verifyItemsAreCompleted(2);
    todoPage.verifyItemsListSize(3);
    todoPage.clickFilterClearCompleted();
    todoPage.verifyItemsListSize(1);
    todoPage.removeTodo(SHOP3);
    todoPage.verifyItemsListSize(0);
    todoPage.verifyFiltersAreHidden();
    todoPage.verifyToggleAllHidden();
  });

  it('testcase for the remove icon', function () {
    var SHOP4 = 'shopping4';
    todoPage.addTodo(SHOP4);
    todoPage.verifyRemoveIconHidden(SHOP4);
    todoPage.hoverItem(SHOP4);
    todoPage.verifyRemoveIconVisible(SHOP4);
    todoPage.removeTodo(SHOP4);
    todoPage.verifyItemsListSize(0);
    todoPage.verifyFiltersAreHidden();
  });

  it('testcase for remembering todos if the page is reloaded', function () {
    todoPage.addTodo(SHOP);
    todoPage.reload();
    todoPage.verifyItemsListSize(1);
    todoPage.verifyItemIsTodo(SHOP);
  });

  it('testcase to edit a todo', function () {
    todoPage.addTodo(SHOP);
    todoPage.editTodoItem(SHOP, 'jogging');
    todoPage.verifyItemIsTodo('jogging');
    //browser.sleep(5000);
  });

});

function registerMatchers() {
  jasmine.addMatchers({
    toEqualAsString: function () {
      return {
        compare: function (actual, expected) {
          return {
            pass: actual.toString() === expected.toString()
          };
        }
      };
    }
  });
}

function clearBrowserCache() {
  browser.executeScript('window.localStorage.clear();');
  browser.executeScript('window.sessionStorage.clear();');
  browser.driver.manage().deleteAllCookies();
}
//inspiration, read about custom matchers here: https://gist.github.com/tomyam1/145236601eb97384f516
