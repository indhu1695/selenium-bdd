
# ***selenium-bdd Automation Framework***  
 
This repository contains automated integration tests.  
  
The tests can run against different browsers.  
  
## *Requirements*  
  
* Git.  
* [Node.js](https://nodejs.org/) >= 8.9 (recommendation is Node.js 10).  
* Java 8 or higher  
* Webstorm (or whatever IDE you're comfortable with).  
* Docker (If SQL database not available).
  
## *Setup*  
  
1. Open a terminal.  
2. Clone the repo.
3. Navigate to the repository folder `cd selenium-bdd-master`.  
4. Install all the npm dependencies `npm i`.
5. If SQL database available, update the database detail in `sqlDatabase.config.json` under `tests/config` folder.
6. If SQL database not available and docker installed in machine, follow below steps for configuration (Optional, Will be automatically handled by framework presets)
    * Pull Docker Image - `docker pull mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04`
    * Execute Docker Image - `docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=SecretP@ssw0rd' --hostname sql2019 -p 1401:1433 --name sql2019ubuntu -d mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04`

## *Starting Test Environment*  

`npm run server`
  
## *Running Tests*  
  
`gulp cucumber`  
  
## *Command line arguments*  
* `--browser` - mention the browser on which tests needs to be executed. `Default : chrome` 
* `--tags` - mention the tag to run tests with given tag. `Default : 'not @Pending'`
  
  
## *Writing new tests*  
  
1. Add a new .feature file for the story you are testing in the correct sub folder of `tests/features/scenario/`  
2. Name the feature (using `Feature:`) and add some Scenarios to your new .feature file  
3. You can add tags as you like to distinguish different groups of tests.
4. Add step definitions for any undefined steps in `tests/features/step-definitions/`  
5. Add any undefined page objects in `tests/locators/`  
6. Run your tests locally before pushing your changes to source control.  
  
## *Code Style*  
  
Coding style is checked via `eslint` for js , `yaml-lint` for yml and `gherkin-lint` for feature files.  
  
## *Running lint*  
  
`npm run lint`  
  
## *Technologies*  
  
The following technologies form the core of the framework:  
  
* **WebdriverIO** `http://webdriver.io/` - WebDriver bindings for Node.js.   
* **Cucumber** `https://cucumber.io/` - Cucumber executes your .feature files, and those files contain executable specifications written in a language called Gherkin.  
* **Gulp** `https://gulpjs.com/` - Automate and enhance your workflow.  

## *Reporting*  
  
* **WDIO console** - `@wdio/spec-reporter`  
* **Json Report** - `wdio-cucumberjs-json-reporter`  
* **HTML Report** - `multiple-cucumber-html-reporter`  
  
## *Framework Owners*  
Indhumathi Selvarajan <indhumathi.s11@wipro.com>  
  
*License*  
----  
Wipro
