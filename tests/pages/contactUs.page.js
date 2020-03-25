const Actions = require('./common/Actions');

class contactUsPage {

    loadPage() {
        Actions.url('http://localhost:5000');
    }

    enterValidName(firstName = 'Indhumathi') {
        Actions.setValue('contactUs_name_txtbox', firstName);
    }

    enterValidEmail(email = 'indhumathi.s11@wipro.com') {
        Actions.setValue('contactUs_email_txtbox', email);
    }

    enterValidPhoneNumber(phoneNumber = '9876543210') {
        Actions.setValue('contactUs_phoneNumber_txtbox', phoneNumber);
    }

    selectService(serviceCategory) {
        Actions.selectByVisibleText('contactUs_neededService_dpdwn', serviceCategory);
    }

    clickProductType(productType) {
        Actions.click(`contactUs_${productType}_radiobtn`);
    }

    enterMessage(message = 'Hi, I\'m interested in selling digital products. ' +
    'Kindly share the process for selling to given email') {
        Actions.setValue('contactUs_message_txtbox', message);
    }

    clickSubmit() {
        Actions.click('contactUs_submit_btn');
    }
}

module.exports = contactUsPage;
