Feature: logout
  As a user
  I want to logout
  So that i can secure my data and actions when i am not using prohealth services

  @foo
  Scenario: logout
    Given a user with email "test@test.com" and password "pass12345" has logged in
    When the user selects logout
    Then the user should be logged out and redirected to the login page

