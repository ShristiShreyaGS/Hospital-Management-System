Feature: User Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter email "admin@hms.com" and password "admin123"
    And I click Sign In
    Then I should be on the dashboard

  Scenario: Login fails with wrong password
    Given I am on the login page
    When I enter email "admin@hms.com" and password "wrongpass"
    And I click Sign In
    Then I should see an error message