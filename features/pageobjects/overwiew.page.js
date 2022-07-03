const Page = require('./page');
const constants = require("../../helpers/constants");
const helper = require('../../helpers/helper');

class OverviewPage extends Page {
    get overviewBar() {
        return $(".header_secondary_container");
    }

    get itemsList() {
        return $(".cart_list");
    }

    get totalPriceBox() {
        return $(".summary_subtotal_label");
    }

    get taxAmountBox() {
        return $(".summary_tax_label");
    }

    get totalAmountBox() {
        return $(".summary_total_label")
    }

    get finishBtn() {
        return $("#finish");
    }

    async getTotalPrice() {
        let box = await this.totalPriceBox;
        let boxText = await box.getText();
        let priceAsText = helper.removeSpacesAndBreaks(boxText);
        let price = helper.convertStringToNumber(priceAsText, constants.startIndexForTotalPrice);
        return price;
    }

    async getTaxAmount() {
        let box = await this.taxAmountBox;
        let boxText = await box.getText();
        let taxAsText = helper.removeSpacesAndBreaks(boxText);
        let tax = helper.convertStringToNumber(taxAsText, constants.startIndexForTaxAmount);
        return tax;
    }

    async getTotalAmount() {
        let box = await this.totalAmountBox;
        let boxText = await box.getText();
        let totalAmountAsText = helper.removeSpacesAndBreaks(boxText);
        let totalAmount = helper.convertStringToNumber(totalAmountAsText, constants.startIndexForTotalAmount);
        return totalAmount;
    }

    async finishTheOverview() {
        let btn = await this.finishBtn;
        await btn.click();
    }
}

module.exports = new OverviewPage();
