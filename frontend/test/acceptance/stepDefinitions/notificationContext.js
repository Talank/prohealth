const {Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-api');

const emailField = '//div/input[@placeholder="email"]';
const passwordField = '//div/input[@placeholder="password"]';
const loginButton = '//div/form/button[.="Log In"]';
const notificationBell = '//div//a[@href="/notifications"]/i[.="notifications"]';
const seeAllNotifications= '//span/a[@href="/notifications"]/../following-sibling::div//a[@href="/notifications"]';

Given('a user with email {string} and password {string} has logged in', function (email, password) {
    // return client.url(client.launch_url + '/user/login').useXpath()
    //     .waitForElementVisible(emailField)
    //     .setValue(emailField, email)
    //     .setValue(passwordField, password)
    //     .click(loginButton).pause(3000)
    //     .useCss();
    return client.page.loginPage().navigate()
        .isLoginFormVisible()
        .setUsernamePassword(email, password)
        .triesLogin()
});

When('the user hovers to the bell icon on the webUI', function () {
    return client.useXpath().waitForElementVisible(notificationBell)
        .moveToElement(notificationBell, 10, 10)
        .useCss();
});

Then('new notifications should be shown in the notification window', function () {
    return client.useXpath().waitForElementVisible('//div[contains(@class, "window__head--text") and text() = "Notifications"]')
        .useCss();
});

When('the user selects the bell icon', function () {
    return client.useXpath().waitForElementVisible(notificationBell)
        .click(notificationBell)
        .useCss();

});

Then('the user should be redirected to the notification page with all notifications', function () {
   return client.url(client.launch_url + '/notifications');
});

When('the user navigates to see all link in notification window', function () {
    return client.useXpath()
        .moveToElement(notificationBell, 10, 10)
        .waitForElementVisible('//div[contains(@class, "window__head--text") and text() = "Notifications"]')
        .click(seeAllNotifications)
        .useCss();
});





//dami
//'//span/a[@href="/notifications"]/../following-sibling::div//a[@href="/notifications"]'