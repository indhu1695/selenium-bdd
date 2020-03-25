let {Given, When, Then} = require('cucumber');

const ContactUsPage = require('../../pages/contactUs.page');
const ThanksPage = require('../../pages/thanks.page');

const contactUsPage = new ContactUsPage();
const thanksPage = new ThanksPage();

Given(/^I launch development url$/, function () {
    contactUsPage.loadPage();
});

Given(/^I enter valid name, email and phone number$/, function () {
    contactUsPage.enterValidName();
    contactUsPage.enterValidEmail();
    contactUsPage.enterValidPhoneNumber();
});

When(/^I select "([^"]*)" as needed service$/, function (serviceCategory) {
    contactUsPage.selectService(serviceCategory);
});

When(/^I click "([^"]*)" as product type to sell$/, function (productType) {
    contactUsPage.clickProductType(productType);
});

When(/^I enter random message and submit form$/, function () {
    contactUsPage.enterMessage();
    contactUsPage.clickSubmit();
});

Then(/^I should see form is submitted successful$/, function () {
    thanksPage.verifySuccessMessage();
});
