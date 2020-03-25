let {Given, When, Then} = require('cucumber');

const sqlConnection = require('../../pages/common/sqlConnection');

Given(/^I authenticate to database$/, async function () {
    await sqlConnection.authenticate().catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
    });
});

When(/^I insert below values$/, async function (rowName) {
    let dataBaseValue = rowName.rows();
    let param = {};
    for (const value of dataBaseValue) {
        param.firstName = value[0];
        param.email = value[1];
        param.phoneNumber = value[2];
        param.services = value[3];
        param.productType = value[4];
        param.message = value[5];
        await sqlConnection.insertValue(param).catch(err => {
            // eslint-disable-next-line no-console
            console.error(err);
        });
    }
});

Then(/^I should see new row inserted$/, async function () {
    sqlConnection.verifyRowAdded();
    await sqlConnection.closeConnection().catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
    });
});