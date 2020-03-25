const Actions = require('./common/Actions');

class thanksPage {
    verifySuccessMessage() {
        Actions.isVisible('thanks_successMessage_lbl');
    }
}

module.exports = thanksPage;