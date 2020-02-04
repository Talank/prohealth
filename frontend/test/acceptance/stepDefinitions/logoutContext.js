const {Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-api');

When('the user selects logout', function () {
    return client.page.sidebarPage().selectLogoutButton()
});

Then('the user should be logged out and redirected to the login page', function () {
    return client.page.loginPage().isLoginFormVisible()
});
