Feature:view messages

  As a user
  I want view the messages
  So that i see the messages send to me by others

  Background:
    Given user has created an account with email "test@test.com" and password "pass12345"
    And a user with email "test@test.com" and password "pass12345" has logged in

  Scenario: view top new messages
    When the user hovers to the message icon on the webUI
    Then new messages should be shown in the message window

  Scenario: view all messages using message icon
    When the user selects the message icon
    Then the user should be redirected to the messages page with all messages

  Scenario: view all the messages using see all link
    When the user navigates to see all link in message window
    Then the user should be redirected to the messages page with all messages