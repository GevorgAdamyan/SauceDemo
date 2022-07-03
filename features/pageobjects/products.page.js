const Page = require('./page');
const helper = require('../../helpers/helper');
const constants = require("../../helpers/constants")

class ProductsPage extends Page {
    get productsPageBar() {
        return $(".header_secondary_container");
    }

    get sortDropdown() {
        return $(".product_sort_container");
    }

    get itemsList() {
        return $(".inventory_list");
    }

    get shoppingCartLink() {
        return $(".shopping_cart_link");
    }

    get shoppingCartBadge() {
        return $(".shopping_cart_badge")
    }

    async getAddedItemsNumber() {
        let badge = await this.shoppingCartBadge;
        let numberAsText = await badge.getText();
        return +numberAsText;
    }

    async getItemsArray() {
        let parent = await this.itemsList;
        let child = parent.$$(".inventory_item");
        return child;
    }

    async getItemNameBox(index) {
        return $(`.inventory_item:nth-child(${index}) .inventory_item_name`);
    }

    async getItemPriceBox(index) {
        return $(`.inventory_item:nth-child(${index}) .inventory_item_price`);
    }

    async getAddToCartBtn(index) {
        return $(`.inventory_item:nth-child(${index}) button`);
    }

    async getRemoveBtn(index) {
        return $(`.inventory_item:nth-child(${index}) #remove-sauce-labs-backpack`);
    }

    async openSortDropdown() {
        let dropdown = await this.sortDropdown;
        await dropdown.click();
    }

    async getDropdownOptionsArray() {
        await this.openSortDropdown();
        let parent = await this.sortDropdown;
        let child = parent.$$("option");
        return child;
    }

    async selectSortingType() {
        let index = helper.indexForSorting;
        let options = await this.getDropdownOptionsArray();
        let option = options[index];
        await option.click();
        await this.getItemsPrices();
    }

    async getItemsPrices() {
        let items = await this.getItemsArray();
        let pricesArray = helper.itemsPrices;
        for (let i = 1; i <= items.length; i++) {
            let itemPriceBox = await this.getItemPriceBox(i);
            let priceBoxText = await itemPriceBox.getText();
            let priceAsString = helper.removeSpacesAndBreaks(priceBoxText);
            let priceAsNumber = helper.convertStringToNumber(priceAsString, constants.startIndexForPrice);
            pricesArray.push(priceAsNumber);
        }
    }

    async addItemsToCart() {
        let items = await this.getItemsArray();
        let numberOfItemsToBeAdded = Math.round(Math.random() * (4 - 2) + 2);
        let previousIndexes = [];
        let pricesArray = helper.priceOfItemsToBeAdded;
        let namesArray = helper.namesOfItemsToBeAdded;
        for (let i = 0; i < numberOfItemsToBeAdded; i++) {
            let index = Math.round(Math.random() * (items.length - 1) + 1);
            let addBtn = await this.getAddToCartBtn(index);
            let isAdded = previousIndexes.includes(index)
            let nameBox = await this.getItemNameBox(index);
            let name = await nameBox.getText();
            let priceBox = await this.getItemPriceBox(index);
            let priceAsText = await priceBox.getText();
            let price = helper.convertStringToNumber(priceAsText, constants.startIndexForPrice);
            if (isAdded === true) {
                continue
            } else {
                await addBtn.click();
                pricesArray.push(price);
                namesArray.push(name);
                previousIndexes.push(index);
            }
        }
    }

    async navigateToCartPage() {
        let link = await this.shoppingCartLink;
        await link.click();
    }
}

module.exports = new ProductsPage();
