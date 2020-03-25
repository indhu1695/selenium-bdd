const glob = require('glob');
const mergeYaml = require('merge-yaml');

let xpath;

class Page {
    constructor() {
        let files = glob.sync('tests/locators/*.yml');
        xpath = mergeYaml(files);
    }

    getElements(elementId) {
        return xpath[elementId];
    }
}

module.exports = new Page();
