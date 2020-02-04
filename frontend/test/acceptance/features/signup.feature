Feature: Create new user
  As a user
  I want to create a new user account
  so that i can use ProHealth services

  @signup
  Scenario: User tries to create a valid user account
    Given user has browsed to the signup page
    When user tries to signup using the webUI by entering the following details in the signup form:
      | First Name       | William         |
      | Last Name        | Harrison        |
      | email            | william@xyz.com |
      | password         | william123      |
      | Confirm password | william123      |
      | Select date      | 2020-01-17      |
      | Gender           | Male            |
    Then a success message "signed up succesfully" should be visible
#    And user "William Harrison" should be created with email "william@xyz.com"
    And the user should be redirected to login page

  Scenario: User tries to create an account with same name but different email
    Given a user has been created using First Name "William" and Last Name "Harrison" and  email "william123@xyz.com"
    And user has browsed to the signup page
    When user tries to signup using the webUI by entering the following details in the signup form:
      | First Name       | William         |
      | Last Name        | Harrison        |
      | email            | william@abc.com |
      | password         | william123      |
      | Confirm password | william123      |
      | Select date      | 2020-01-17      |
      | Gender           | Male            |
    Then a success message "signed up succesfully" should be visible
#    And user "William Harrison" should be created with email "william@abc.com"
    And the user should be redirected to login page

  Scenario: User tries to create an account with email of an already existing user
    Given a user has been created using email "william@xyz.com"
    And user has browsed to the signup page
    When user tries to signup using the webUI by entering the following details in the signup form:
      | First Name       | William         |
      | Last Name        | Harrison        |
      | email            | william@xyz.com |
      | password         | william123      |
      | Confirm password | william123      |
      | Select date      | 2020-01-17      |
      | Gender           | Male            |
    Then an error message "user with this email already exists." should be shown above "email" field
#    And a new user with email "william@xyz.com" should not be created

  Scenario Outline: create an user with incomplete user details
    Given user has browsed to the signup page
    When user tries to signup using the webUI by entering the following details in the signup form:
      | First Name       | <first name>       |
      | Last Name        | <last name>        |
      | email            | <email>            |
      | password         | <password>         |
      | Confirm password | <confirm password> |
      | Select date      | <date>             |
      | Gender           | <gender>           |
    Then an error message "This field may not be blank." should be shown above "<field>" field
    Examples:
      | first name | last name | email           | password   | confirm password | date       | gender | field      |
      |            | Harrison  | william@xyz.com | william123 | william123       | 2020-01-17 | Male   | First Name |
      | William    |           | william@xyz.com | william123 | william123       | 2020-01-17 | Male   | Last Name  |

  Scenario Outline: User tries to signup with invalid email
    Given user has browsed to the signup page
    When user enters email as "<email>"
    Then signup button should be disabled
    Examples:
      | email           |
      | swoichha        |
      | swoichha@       |
      | swoichha@gmail. |
      | @gmail          |
      | @gmail.         |


  Scenario Outline: User tries to signup with improper combination of password
    Given user has browsed to the signup page
    When user tries to signup entering email "william@xyz.com" password "<Password>" and confirm password "<Confirm password>"
    Then an error message "<validation>" should be shown above "password" field
    Examples:
      | Password   | Confirm password | validation                                                        |
      | 9815123456 | 9815123456       | This password is entirely numeric.                                |
      | 123456789  | 123456789        | This password is too common.                                      |
      | 12345      | 12345            | This password is too short. It must contain at least 8 characters |
      | hello      | hello            | This password is too common.                                      |
