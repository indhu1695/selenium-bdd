const assert = require('assert');
const Page = require('../common/Page');

class Actions {

    url(url) {
        return browser.url(url);
    }

    setValue(locator, value) {
        locator = Page.getElements(locator);
        $(locator).waitForDisplayed(50000, false, 'Element ' + locator + ' not found');
        return $(locator).setValue(value);
    }

    click(locator) {
        locator = Page.getElements(locator);
        return $(locator).click();
    }

    isVisible(locator) {
        locator = Page.getElements(locator);
        let value = $(locator).isExisting();
        if (value) {
            return assert.equal(value, true, 'Element Present');
        } else {
            return assert.equal(value, true, 'Unable to locate element');
        }
    }

    selectByVisibleText(locator, value) {
        locator = Page.getElements(locator);
        return $(locator).selectByVisibleText(value);
    }

    waitForExist(locator) {
        locator = Page.getElements(locator);
        return $(locator).waitForExist(50000, false, 'Element ' + locator + ' not found');
    }

    waitForEnabled(locator) {
        locator = Page.getElements(locator);
        return $(locator).waitForEnabled(20000, false, 'Unable to perform action as element is not enabled');
    }

    pause() {
        return browser.pause(1000);
    }
}

module.exports = new Actions();
