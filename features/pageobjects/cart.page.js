const Page = require('./page');
const helper = require("../../helpers/helper");
const constants = require("../../helpers/constants");

class CartPage extends Page {
    get cartPageBar() {
        return $(".header_secondary_container");
    }

    get addedItemsList() {
        return $(".cart_list");
    }

    get checkOutBtn() {
        return $("#checkout")
    }

    async getAddedItemsArray() {
        let parent = await this.addedItemsList;
        let child = parent.$$("cart_item");
        return child;
    }

    async getAddedItemsNameBoxes() {
        let parent = await this.addedItemsList;
        let child = parent.$$(".inventory_item_name");
        return child;
    }

    async getAddedItemsPriceBoxes() {
        let parent = await this.addedItemsList;
        let child = parent.$$(".inventory_item_price");
        return child;
    }

    async getAddedItemsNames() {
        let names = helper.namesOfAddedItmes;
        let namesArray = await this.getAddedItemsNameBoxes();
        for(let i = 0; i < namesArray.length; i++) {
            let nameBox = namesArray[i];
            let name = await nameBox.getText();
            names.push(name);
        }
        console.log("===========");
        console.log(names);
        console.log("===========");
    }

    async getAddedItemsPrices() {
        let prices = helper.priceOfAddedItems;
        let pricesArray = await this.getAddedItemsPriceBoxes();
        for(let i = 0; i < pricesArray.length; i++) {
            let priceBox = pricesArray[i];
            let priceAsString = await priceBox.getText();
            let price = helper.convertStringToNumber(priceAsString, constants.startIndexForPrice)
            prices.push(price);
        }
        console.log("===========");
        console.log(prices);
        console.log("===========");
    }

    async getAddedItemsInfo() {
        await this.getAddedItemsNames();
        await this.getAddedItemsPrices();
    }

    async proceedCheckout() {
        let btn = await this.checkOutBtn;
        await btn.click();
    }
}

module.exports = new CartPage();
