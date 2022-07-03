Feature: Online order e2e test on SauceDemo.com

  Scenario: As a user, I can log into the account and make online order

    Given I am on the Login page
    When I assert that Login page is opened correctly
    And I login as standard user with valid credentials
    And I assert that I am logged into my account
    And I sort the items by price
    And I assert that all items are sorted correctly
    And I add some items to my cart
    And I assert that itmes are added to my cart
    And I navigate to Cart page
    And I assert that I am redirected to the Cart page
    And I assert that all items are added to Cart with correct names and prices
    And I click on Checkout Button
    And I assert that I am redirected to Information page
    And I fill and confirm my Information
    And I assert that I am reddirected to Overview page
    And I assert that the price of the order is calculated correctly
    And I click on Finnish button
    Then I should see a success message