const faker = require("@faker-js/faker").faker;

let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let postCode = faker.address.zipCode();
let prices = [];
let itemsToBeAdded = [];
let addedItmes = [];
let itemsToBeAddedPrice = [];
let addedItmesPrice = [];
let sortingIndex = Math.round(Math.random() + 2);

module.exports = {
    namesOfItemsToBeAdded: itemsToBeAdded,
    namesOfAddedItmes: addedItmes,
    itemsPrices: prices,
    priceOfItemsToBeAdded: itemsToBeAddedPrice,
    priceOfAddedItems: addedItmesPrice,
    indexForSorting: sortingIndex,
    customerInfo: [firstName, lastName, postCode],
    getUserName(string, startIndex, endIndex) {
        return string.substring(startIndex, endIndex)
    },
    getPassword(string, startIndex, endIndex) {
        return string.substring(startIndex, endIndex)
    },
    removeSpacesAndBreaks(string) {
        let withoutBreaks = string.replace(/[\r\n]/gm, '');
        let withoutSpaces = withoutBreaks.split(' ').join('');
        return withoutSpaces;
    },
    convertStringToNumber(string, startIndex) {
        let withoutDollar = string.substring(startIndex);
        let withoutComma = withoutDollar.replace(",", '');
        return +withoutComma;
    },
    areArraysTheSame(arr1, arr2) {
        return arr1.every((val, index) => val === arr2[index]);
    },
    sumTheTotalPrice(arr) {
        let i = 0
        arr.forEach(val => {
            i += val
        })
        return i;
    }
}