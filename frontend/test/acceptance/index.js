const { setDefaultTimeout, After, Before } = require('cucumber')
const { createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api')

setDefaultTimeout(60000)


Before(async () => {
    await startWebDriver();
    await createSession();
})

After(async () => {
    await closeSession();
    await stopWebDriver();
})

require('./stepDefinitions/loginContext')
require('./stepDefinitions/logoutContext')
require('./stepDefinitions/signupContext')
require('./stepDefinitions/askAQuestionContext')
require('./stepDefinitions/browseToSignupPageContext')
require('./stepDefinitions/messagesContext')
require('./stepDefinitions/read_newsContext')
require('./stepDefinitions/notificationContext')

require('./helper/hooks')
// require('stepDefinitions/loginContext')
//
// After({tags: "@foo"}, async () =>{
//     console.log("-------------------!!!!!!!!!!!!!!!!LA SWOICHHA, AYO HAI TA YETA SAMMA-------------------------------------")
// }

