const { Given, When, Then } = require("@wdio/cucumber-framework");
const loginPage = require("../pageobjects/login.page");
const productsPage = require("../pageobjects/products.page");
const cartPage = require("../pageobjects/cart.page");
const informationPage = require("../pageobjects/information.page");
const overviewPage = require("../pageobjects/overwiew.page");
const assertions = require("../assertions/assertions")
const helper = require("../../helpers/helper");
const constants = require("../../helpers/constants");

Given("I am on the Login page", async () => {
    await loginPage.goTo();
});

When("I assert that Login page is opened correctly", async () => {
    await assertions.verifyThatLogInPageIsOpenedCorrectly();
})

When("I login as standard user with valid credentials", async () => {
    let infoForLogin = constants.forStandardUserLogin;
    await loginPage.logIn(infoForLogin);
});

When("I assert that I am logged into my account", async () => {
    await assertions.verifyThatLogInIsSuccessfull();
});

When("I sort the items by price", async () => {
    // let index = helper.indexForSorting;
    await productsPage.selectSortingType();
});

When("I assert that all items are sorted correctly", async () => {
    await assertions.verifyThatItemsAreSortedCorrectly();
});

When("I add some items to my cart", async () => {
    await productsPage.addItemsToCart();
});

When("I assert that itmes are added to my cart", async () => {
    await assertions.verifyThatNumberOfAddedItemsIsDysplayedCorrectlyOnCartIcon();
});

When("I navigate to Cart page", async () => {
    await productsPage.navigateToCartPage();
});

When("I assert that I am redirected to the Cart page", async () => {
    await assertions.verifyThatCartPageIsOpenedCorrectly();
})

When("I assert that all items are added to Cart with correct names and prices", async () => {
    await assertions.verifyThatTheNamesAndPricesOfAddedItemsAreCorrect();
});

When("I click on Checkout Button", async () => {
    await cartPage.proceedCheckout();
});

When("I assert that I am redirected to Information page", async () => {
    await assertions.verifyThatInfoPageIsOpenedCorrectly();
});

When("I fill and confirm my Information", async () => {
    // let customerInfo = helper.customerInfo;
    await informationPage.confirmMyInfo();
});

When("I assert that I am reddirected to Overview page", async () => {
    await assertions.verifyThatOverViewPageIsOpenedCorrectly();
});

When("I assert that the price of the order is calculated correctly", async () => {
    await assertions.verifyThatTotalPriceOfTheOrderIsCalculatedCorrectly();
    await assertions.verifyThatTotalAmountToBePaidIsCalculatedCorrectly();
});

When("I click on Finnish button", async () => {
   await overviewPage.finishTheOverview(); 
});

Then("I should see a success message", async () => {
    await assertions.verifyThatOrderIsSuccessfullyMade();
});
