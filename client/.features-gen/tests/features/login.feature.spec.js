// Generated from: tests\features\login.feature
import { test } from "playwright-bdd";

test.describe('User Login', () => {

  test('Successful login with valid credentials', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I enter email "admin@hms.com" and password "admin123"', null, { page }); 
    await And('I click Sign In', null, { page }); 
    await Then('I should be on the dashboard', null, { page }); 
  });

  test('Login fails with wrong password', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I enter email "admin@hms.com" and password "wrongpass"', null, { page }); 
    await And('I click Sign In', null, { page }); 
    await Then('I should see an error message', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I enter email \"admin@hms.com\" and password \"admin123\"","stepMatchArguments":[{"group":{"start":14,"value":"\"admin@hms.com\"","children":[{"start":15,"value":"admin@hms.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":43,"value":"\"admin123\"","children":[{"start":44,"value":"admin123","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And I click Sign In","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then I should be on the dashboard","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I enter email \"admin@hms.com\" and password \"wrongpass\"","stepMatchArguments":[{"group":{"start":14,"value":"\"admin@hms.com\"","children":[{"start":15,"value":"admin@hms.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":43,"value":"\"wrongpass\"","children":[{"start":44,"value":"wrongpass","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I click Sign In","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then I should see an error message","stepMatchArguments":[]}]},
]; // bdd-data-end