Feature: login
  As a user
  I want to login to prohealth
  So that I can use the prohealth services

  Background:
    Given user has browsed to the homepage
    And user has created an account with email "test@test.com" and password "pass12345"
    And user has browsed to the login page

  Scenario: login with correct email and correct password
    When user enters email "test@test.com" and password "pass12345" in the login form
    And user tries to login
    Then the user should be logged in

  Scenario Outline: login with wrong credentials
    When user enters email "<email>" and password "<password>" in the login form
    And user tries to login
    Then an error message "<message>" should be shown in the same page
    Examples:
      | email           | password      | message                                                                                          |
      | test12@test.com | password12345 | User with that email doesnot exists!                                                             |
      | test@test.com   | passw12345    | The email or password you entered is incorrect! Please make sure your email or password is valid |
      | test12@test.com | pass12345     | User with that email doesnot exists!                                                             |
      | test@test.co    | password12345 | User with that email doesnot exists!                                                             |

  Scenario Outline: visibility of login button
    When user enters email "<email>" and password "<password>" in the login form
    And user tries to login
    Then login button should be disabled
    Examples:
      | email         | password |
      | test@test.com | 12345    |
      | test@test.com |          |
      | test.com      | pass1234 |
      | test@test     | pass1234 |
      | test          | pass1234 |

#  Scenario: login with correct email and incorrect password
#    When user enters email "test@test.com"
#    And user enters password "password"
#    And user tries to login
#    Then an error message "The email or password you entered is incorrect! Please make sure your email or password is valid" should be shown in the same page
#
#  Scenario: login with incorrect email and correct password
#    When user enters email "testing@test.com"
#    And user enters password "pass1234"
#    And user tries to login
#    Then an error message "The email or password you entered is incorrect! Please make sure your email or password is valid" should be shown in the same page
#
#  Scenario: login with incorrect email and incorrect password
#    When user enters email "testing@test.com"
#    And user enters password "password"
#    And user tries to login
#    Then an error message "The email or password you entered is incorrect! Please make sure your email or password is valid" should be shown in the same page

#
#  Scenario: login with correct email and password
#    When user enters the following details in login page
#      | email         | password |
#      | test@test.com | pass1234 |
#    And user tries to login
#    Then user should be redirected to the home page

