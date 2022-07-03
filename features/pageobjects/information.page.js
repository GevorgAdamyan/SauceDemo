const Page = require('./page');
const helper = require("../../helpers/helper");

class InformationPage extends Page {
    get infoPageBar() {
        return $(".header_secondary_container");
    }
    
    get firstNameField() {
        return $("#first-name");
    }

    get lastNameField() {
        return $("#last-name");
    }

    get postCodeField() {
        return $("#postal-code");
    }

    get continueBtn() {
        return $("#continue");
    }

    async insertFirsName(firstName) {
        let field = await this.firstNameField;
        await field.click();
        await field.setValue(firstName);
    }

    async insertLastName(lastName) {
        let field = await this.lastNameField;
        await field.click();
        await field.setValue(lastName);
    }
    
    async insertPostCode(postCode) {
        let field = await this.postCodeField;
        await field.click();
        await field.setValue(postCode);
    }

    async fillInfo() {
        let customerInfo = helper.customerInfo;
        await this.insertFirsName(customerInfo[0]);
        await this.insertLastName(customerInfo[1]);
        await this.insertPostCode(customerInfo[2]);
    }

    async clickOnContinueBtn() {
        let btn = await this.continueBtn;
        await btn.click();
    }

    async confirmMyInfo(arr) {
        await this.fillInfo(arr);
        await this.clickOnContinueBtn();
    }
}

module.exports = new InformationPage();
