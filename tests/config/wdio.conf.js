const cucumberJson = require('wdio-cucumberjs-json-reporter').default;
const {generate} = require('multiple-cucumber-html-reporter');
const {removeSync} = require('fs-extra');
const os = require('os');
let importFunction = require('./import');
let databaseProperty = require('./databaseConfig');

let featureFilePath = 'tests/features/scenario/test.feature';

let argv = require('yargs')
    .usage('Usage: gulp cucumber --[options]')
    .options({
        browser: {
            alias: 'browser',
            describe: 'Specify the browser',
            default: 'chrome'
        },
        tags: {
            alias: 'tags',
            describe: 'Specify the tag'
        },
        databaseAvailable: {
            alias: 'databaseAvailable',
            describe: 'Check for existing mssql database',
            default: false
        }
    })
    .argv;

function getCapabilities() {
    let capabilitiesArray = [];
    let deviceName,
        deviceType;
    if (os.type() === 'Darwin') {
        deviceName = 'Mac OS';
        deviceType = 'osx';
    }
    if (os.type() === 'win32' || os.type() === 'win64' || os.type() === 'Windows_NT') {
        deviceName = 'Windows';
        deviceType = 'windows';
    }
    if (os.type() === 'Linux' || os.type() === 'linux') {
        deviceName = 'Linux';
        deviceType = 'linux';
    }
    let returnObject = {
        browserName: argv.browser,
        'cjson:metadata': {
            browser: {
                name: argv.browser
            },
            device: deviceName,
            platform: {
                name: deviceType,
                version: os.release()
            }
        }
    };
    capabilitiesArray.push(returnObject);
    return capabilitiesArray;
}

function checkDatabaseAvailable() {
    if(argv.databaseAvailable.toString() === 'true' || argv.databaseAvailable.toString() === true) {
        Object.keys(databaseProperty).forEach(value => {
            if(databaseProperty[value] === undefined || databaseProperty[value] === '') {
                // eslint-disable-next-line no-console
                console.error('Provide database details for establishing connection in "tests\\config\\databaseConfig.json"');
                // eslint-disable-next-line no-process-exit
                process.exit(1);
            }
        });
        return databaseProperty;
    }
    else {
        // eslint-disable-next-line global-require
        return require('./checkPreRequisite');
    }
}

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which tests specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        featureFilePath
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several tests
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same tests should run tests.
    //
    maxInstances: 2,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: getCapabilities(),
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'silent',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://localhost',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your tests setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the tests process.
    services: ['selenium-standalone'],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: ['spec', ['cucumberjs-json', {jsonFolder: 'tests/reports/json/'}]],
    //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: importFunction.parseSteps(),        // <string[]> (file/dir) require files before executing features
        backtrace: false,   // <boolean> show full backtrace for errors
        requireModule: [],  // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: false,      // <boolean> fail if there are any undefined or pending steps
        tagExpression: argv.tags,  // <string> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 60000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the tests process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // eslint-disable-next-line no-unused-vars
    onPrepare: function (config, capabilities) {
        removeSync('tests/reports/json/');
        removeSync('tests/reports/html/');
    },
    /**
     * Gets executed just before initialising the webdriver session and tests framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before tests execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Runs before a Cucumber feature
     */
    // beforeFeature: function (uri, feature, scenarios) {
    // },
    /**
     * Runs before a Cucumber scenario
     */
    // beforeScenario: function (uri, feature, scenario, sourceLocation) {
    // },
    /**
     * Runs before a Cucumber step
     */
    // beforeStep: function (uri, feature, stepData, context) {
    // },
    /**
     * Runs after a Cucumber step
     */
    // afterStep: function (uri, feature, { error, result, duration, passed }, stepData, context) {
    // },
    /**
     * Runs after a Cucumber scenario
     */
    // eslint-disable-next-line no-unused-vars
    afterScenario: function (uri, feature, scenario, result, sourceLocation) {
        if (result.status === 'failed') {
            const screenShot = global.browser.takeScreenshot();
            return cucumberJson.attach(screenShot, 'image/png');
        }
    },
    /**
     * Runs after a Cucumber feature
     */
    // afterFeature: function (uri, feature, scenarios) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the tests.
     * @param {Number} result 0 - tests pass, 1 - tests fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the tests run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing tests results
     */
    // eslint-disable-next-line no-unused-vars
    onComplete: function(exitCode, config, capabilities, results) {
        generate({
            jsonDir: 'tests/reports/json',
            reportPath: 'tests/reports/html',
            openReportInBrowser: true,
            disableLog: true
        });
    },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
    /**
     * Gets executed when configuration is getting loaded.
     * @param {object} database connection property
     */
    databaseProperty: checkDatabaseAvailable()
};
