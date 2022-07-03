const Page = require('./page');
const constants = require("../../helpers/constants");
const helper = require("../../helpers/helper");

class LoginPage extends Page {
    get loginPanel() {
        return $(".login_wrapper");
    }

    get userNameField() {
        return $("#user-name");
    }

    get passwordField() {
        return $("#password");
    }

    get logInBtn() {
        return $("#login-button");
    }
    
    get userNamesBox() {
        return $('#login_credentials');
    }

    get passwordBox() {
        return $('.login_password');
    }

    async getUserCredentials(startIndexForUsername, endIndexForUserName) {
        let userNamesBox = await this.userNamesBox;
        let passwordBox = await this.passwordBox;
        let userNames = await userNamesBox.getText();
        let passwords = await passwordBox.getText();
        let gottenText = [userNames, passwords];
        let withoutBreaks = gottenText.join('').replace(/[\r\n]/gm, '');
        let withoutSpaces = withoutBreaks.split(' ').join('');
        let userName = helper.getUserName(withoutSpaces, startIndexForUsername, endIndexForUserName);
        let password = helper.getPassword(withoutSpaces, constants.startIndexForPassword, constants.endIndexForPassword);
        return [userName, password]
    }

    async insertCredentials(arr) {
        let startIndexForUsername = arr[0];
        let endIndexForUserName = arr[1];
        let credentials = await this.getUserCredentials(startIndexForUsername, endIndexForUserName)
        let userNameField = await this.userNameField;
        let passwordField = await this.passwordField;
        await userNameField.click();
        await userNameField.setValue(credentials[0]);
        await passwordField.click();
        await passwordField.setValue(credentials[1]);
    }

    async clickOnLogInBtn() {
        let btn = await this.logInBtn;
        await btn.click();
    }

    async logIn(userName, password) {
        await this.insertCredentials(userName, password);
        await this.clickOnLogInBtn();
    }

    async goTo() {
        await super.goTo();
        await browser.maximizeWindow();
    }
}

module.exports = new LoginPage();
