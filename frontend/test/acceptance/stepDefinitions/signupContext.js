const {After, Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-api');
const assert = require('assert');
const fetch = require('node-fetch');

const firstNameField = '//div/input[@name="first_name"]';
const lastNameField = '//div/input[@name="last_name"]';
const emailField = '//div/input[@name="email"]';
const passwordField = '//div/input[@name="password"]';
const confirmPasswordField = '//div/input[@name="password2"]';
const selectDateField = '//div/input[@placeholder="Select date"]';
const genderField = '//div[@class="ant-select-selection__rendered"]';
const signupButton = '//div/button[.= "Signup"]';
const successMsg = '//div//span[.="signed up succesfully"]'

const createdUser = {};

Given('user has browsed to the signup page', function () {
    return client.url(client.launch_url + '/user/signup')
});

Given('user has created an account with email {string} and password {string}', function (email, password) {
    console.log(`Basic ` + `${client.globals.admin_username}:${client.globals.admin_password}`)
    const header = {}
    header['Authorization'] = `Basic ` +   Buffer.from(`${client.globals.admin_username}:${client.globals.admin_password}`).toString('base64')
    header['Content-Type'] = 'application/json'
    return fetch(client.globals.backend_url + '/api/users/', {
        method: 'POST',
        body: JSON.stringify({
            first_name: "Test", last_name: "User", email, password, gender: "M", date_of_birth: "2020-02-12"
        }),
        headers: header
    })
        .then(res => {
            console.log(res.status)
            if (res.status <200 || res.status>=400){
                throw new Error("Failed to create user: "+ res.statusText)
            }
            return res.text()
        })
        .then(res => {
            console.log(JSON.parse(res)['id'])
            createdUser[email] =  JSON.parse(res)['id'];
        })
});

When('user tries to signup using the webUI by entering the following details in the signup form:', function (dataTable) {
    var elementsToEnter = dataTable.rowsHash()
    // console.log();
    var fname = elementsToEnter['First Name']
    var lname = elementsToEnter['Last Name']
    var email = elementsToEnter['email']
    var password = elementsToEnter['password']
    var confirmPassword = elementsToEnter['Confirm password']
    var selectDate = elementsToEnter['Select date']
    var gender = elementsToEnter['Gender']


    return client.useXpath().setValue(firstNameField, fname)
        .setValue(lastNameField, lname)
        .setValue(emailField, email)
        .setValue(passwordField, password)
        .setValue(confirmPasswordField, confirmPassword)
        .click(selectDateField).setValue('xpath', '//div/input[@class="ant-calendar-input "]', selectDate + "\n")
        .click(genderField).waitForElementVisible(`//div//li[.="${gender}"]`).click(`//div//li[contains(text(), "${gender}")]`)
        .waitForElementVisible(signupButton).click(signupButton)
        .useCss()


});

Then('a success message {string} should be visible', function (message) {
    return client.useXpath().waitForElementVisible(successMsg)
        .useCss();
    // return client.element('xpath', successMsg, (result) => {
    //     // console.log(result.value['ELEMENT'])
    //     client.elementIdText(result.value['ELEMENT'], (result) => {
    //        assert.strictEqual(result.value, message, `Expected ${message} but got ${result.value}`)
    //     })
    // })
});

Then('the user should be redirected to login page', function () {
    return client.useXpath().waitForElementVisible('//div/h1[contains(text(),"Login")]')
        .useCss();
});

Given('a user has been created using First Name {string} and Last Name {string} and  email {string}', async function (firstName, lastName, mail) {
    await client.url(client.launch_url + '/user/signup')
    const password = 'password123';
    const confirmPassword = 'password123';

    await client.useXpath().setValue(firstNameField, firstName)
        .setValue(lastNameField, lastName)
        .setValue(emailField, mail)
        .setValue(passwordField, password)
        .setValue(confirmPasswordField, confirmPassword)
        .waitForElementVisible(signupButton).click(signupButton)
    return client.waitForElementVisible(successMsg)
        .useCss()
});

Given('a user has been created using email {string}', async function (mail) {
    await client.url(client.launch_url + '/user/signup')
    const firstName = " william";
    const lastName = "harrison";
    const password = 'password123';
    const confirmPassword = 'password123';

    await client.useXpath().setValue(firstNameField, firstName)
        .setValue(lastNameField, lastName)
        .setValue(emailField, mail)
        .setValue(passwordField, password)
        .setValue(confirmPasswordField, confirmPassword)
        .waitForElementVisible(signupButton).click(signupButton)

    return client.waitForElementVisible(successMsg)
        .useCss()
});

Then('an error message {string} should be shown above {string} field', function (errorMsg, field) {
    return client.useXpath().waitForElementVisible(`//div[@class="form__group"]/input[@placeholder="${field}"]/preceding-sibling::li[text()]`)
        .element('xpath', `//div[@class="form__group"]/input[@placeholder="${field}"]/preceding-sibling::li[text()]`, (result) => {
            client.elementIdText(result.value['ELEMENT'], (result) => {
                assert.strictEqual(result.value, errorMsg, `Error: expected ${errorMsg} but got ${result.value}`)
            })
        })
});

When('user tries to signup entering email as {string}', function (mail) {
    return client.useXpath().setValue(emailField, mail)
        .useCss()
});



Then('signup button should be disabled', function () {
    return client.useXpath().waitForElementVisible('//div/button[@disabled][.= "Signup"]')
        .useCss()
});
When('user enters email as {string}', function (mail) {
     return client.useXpath().waitForElementVisible(emailField)
         .setValue(emailField, mail);
});


When('user tries to signup entering email {string} password {string} and confirm password {string}', function (mail, password, confirmPassword) {
    return client.useXpath().setValue(emailField, mail)
        .setValue(passwordField, password)
        .setValue(confirmPasswordField,confirmPassword)
        .waitForElementVisible(signupButton).click(signupButton)
        .useCss()
});


After(async () => {
    for (const email in createdUser) {

        const header = {}
        header['Authorization'] = `Basic ` + Buffer.from(`${client.globals.admin_username}:${client.globals.admin_password}`).toString('base64')
        header['Content-Type'] = 'application/json'
        await fetch(client.globals.backend_url + '/api/users/' + createdUser[email], {
            method: 'DELETE',
            headers: header
        })
            .then(res => {
                console.log(res.status)
                if (res.status < 200 || res.status >= 400) {
                    throw new Error("Failed to create user: " + res.statusText)
                }
            })
    }
})
