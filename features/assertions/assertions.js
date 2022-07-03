const loginPage = require("../pageobjects/login.page");
const productsPage = require("../pageobjects/products.page");
const cartPage = require("../pageobjects/cart.page");
const informationPage = require("../pageobjects/information.page");
const overviewPage = require("../pageobjects/overwiew.page");
const finishPage = require("../pageobjects/finish.page");
const helper = require("../../helpers/helper");
const constants = require("../../helpers/constants");
const expectChai = require("chai").expect;

class Assertions {
    async verifyThatLogInPageIsOpenedCorrectly() {
        let pageTitle = constants.logInPageTitle;
        let loginPanel = loginPage.loginPanel;
        await expect(browser).toHaveTitle(pageTitle);
        await expect(loginPanel).toBeDisplayed();
    }

    async verifyThatLogInIsSuccessfull() {
        let path = constants.productsPagePath;
        let pageBar = await productsPage.productsPageBar;
        await expect(browser).toHaveUrlContaining(path);
        await expect(pageBar).toBeDisplayed();
    }

    async verifyThatItemsAreSortedCorrectly() {
        let index = helper.indexForSorting;
        let options = await productsPage.getDropdownOptionsArray();
        let option = options[index];
        let prices = helper.itemsPrices;
        await expect(option).toBeSelected();
        if(index === constants.indexForSortingHiLo) {
            for(let i = 0; i < prices.length - 1; i++) {
                await expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
            }
        } else {
            for(let i = 0; i < prices.length - 1; i++) {
                await expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
            }
        }
    }

    async verifyThatNumberOfAddedItemsIsDysplayedCorrectlyOnCartIcon() {
        let numberOnCartIcon = await productsPage.getAddedItemsNumber();
        let numberOfAddedItems = helper.namesOfItemsToBeAdded.length;
        await expect(numberOnCartIcon).toEqual(numberOfAddedItems);
    }

    async verifyThatCartPageIsOpenedCorrectly() {
        let cartPagePath = constants.cartPagePath;
        let cartPageBar = await cartPage.cartPageBar;
        let itemsList = await cartPage.addedItemsList;
        await expect(browser).toHaveUrlContaining(cartPagePath);
        await expect(cartPageBar).toBeDisplayed();
        await expect(itemsList).toBeDisplayed();
    }

    async verifyThatTheNamesAndPricesOfAddedItemsAreCorrect() {
        await cartPage.getAddedItemsInfo();
        let namesOfItemsToBeAdded = helper.namesOfItemsToBeAdded;
        let priceOfItemsToBeAdded = helper.priceOfItemsToBeAdded;
        let totalPriceOfItmesToBeAdd = helper.sumTheTotalPrice(priceOfItemsToBeAdded)
        let namesOfAddedItmes = helper.namesOfAddedItmes;
        let priceOfAddedItems = helper.priceOfAddedItems;
        let totalPriceOfAddedItems = helper.sumTheTotalPrice(priceOfAddedItems);
        let areNamesCorrect = helper.areArraysTheSame(namesOfItemsToBeAdded, namesOfAddedItmes);
        let areThePricesCorrect = helper.areArraysTheSame(priceOfItemsToBeAdded, priceOfAddedItems);
        expectChai(areNamesCorrect).to.be.true;
        expectChai(areThePricesCorrect).to.be.true
        await expect(totalPriceOfItmesToBeAdd).toEqual(totalPriceOfAddedItems);
    }

    async verifyThatInfoPageIsOpenedCorrectly() {
        let infoPageBar = await informationPage.infoPageBar;
        let infoPagePath = constants.infoPagePath;
        await expect(browser).toHaveUrlContaining(infoPagePath);
        await expect(infoPageBar).toBeDisplayed();
    }

    async verifyThatOverViewPageIsOpenedCorrectly() {
        let overViewPageBar = await overviewPage.overviewBar;
        let overViewPagePath = constants.overViewPagePath;
        await expect(browser).toHaveUrlContaining(overViewPagePath);
        await expect(overViewPageBar).toBeDisplayed();
    }

    async verifyThatTotalPriceOfTheOrderIsCalculatedCorrectly() {
        let totalPriceFromOverViewPage = await overviewPage.getTotalPrice();
        let addedItemsPrice = helper.priceOfAddedItems;
        let actualTotalPrice = helper.sumTheTotalPrice(addedItemsPrice);
        await expect(totalPriceFromOverViewPage).toEqual(actualTotalPrice);
    }

    async verifyThatTotalAmountToBePaidIsCalculatedCorrectly() {
        let totalPriceFromOverViewPage = await overviewPage.getTotalPrice();
        let taxAmount = await overviewPage.getTaxAmount();
        let totalAmountFromOverViewPage = await overviewPage.getTotalAmount();
        let actualTotalAmount = totalPriceFromOverViewPage + taxAmount;
        await expect(totalAmountFromOverViewPage).toEqual(actualTotalAmount);
    }

    async verifyThatOrderIsSuccessfullyMade() {
        let finnishPagePath = constants.finnishPagePath;
        let completeBar = await finishPage.completeBar;
        let successMessageBox = await finishPage.successMessageBox;
        let successMessageText = constants.successMessageText;
        let successImage = await finishPage.successImage;
        await expect(browser).toHaveUrlContaining(finnishPagePath);
        await expect(completeBar).toBeDisplayed();
        await expect(successMessageBox).toHaveText(successMessageText);
        await expect(successImage).toBeDisplayed();
    }
}

module.exports = new Assertions();
