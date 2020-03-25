let {Given, When, Then} = require('cucumber');

const sqlConnection = require('../../pages/common/sqlConnection');
const ContactUsPage = require('../../pages/contactUs.page');
const ThanksPage = require('../../pages/thanks.page');

const contactUsPage = new ContactUsPage();
const thanksPage = new ThanksPage();

let sqlFirstValue;

Given(/^I retrieve last added row value$/, async function () {
    sqlFirstValue = await sqlConnection.fetchLastAddedValue();
    await sqlConnection.closeConnection();
});

When(/^I fill application using the retrieved values$/, function () {
    contactUsPage.enterValidName(sqlFirstValue.first_name);
    contactUsPage.enterValidEmail(sqlFirstValue.email);
    contactUsPage.enterValidPhoneNumber(sqlFirstValue.phone);
    contactUsPage.selectService(sqlFirstValue.needed_service);
    contactUsPage.clickProductType(sqlFirstValue.product_sell);
    contactUsPage.enterMessage(sqlFirstValue.random_message);
    contactUsPage.clickSubmit();
});

Then(/^I should see form is submitted successful\.$/, function () {
    thanksPage.verifySuccessMessage();
});