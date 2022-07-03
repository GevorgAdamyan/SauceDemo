const Page = require('./page');

class FinnishPage extends Page {
    get completeBar() {
        return $(".header_secondary_container");
    }

    get successImage() {
        return $(".pony_express");
    }

    get successMessageBox() {
        return $(".complete-text");
    }
}

module.exports = new FinnishPage();
