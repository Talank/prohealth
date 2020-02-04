const server_url = process.env.SERVER_URL || 'http://172.17.0.1:8000';
const launch_url = process.env.LAUNCH_URL || 'http://172.17.0.1:3000';
const selenium_host = process.env.SELENIUM_HOST || '127.0.0.1';
const admin_username = process.env.ADMIN_USERNMAE || 'admin@prohealth.com';
const admin_password = process.env.ADMIN_PASSWORD || 'pass1234';

module.exports = {
    page_objects_path: './test/acceptance/pageObjects',
    helpers: './test/acceptance/helper',
    src_folders: ['test'],
    test_settings: {
        default: {
            selenium_host,
            launch_url,
            globals: {
                backend_url: server_url,
                admin_username,
                admin_password
             },
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                chromeOptions: {
                    args: ['disable-gpu'],
                    w3c: false
                }
            }
        }
    }
}
