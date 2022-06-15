const assert = require('assert');

Feature('Liking Restaurants');

Before((I) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurant', (I) => {
    I.seeElement('#restaurantsList');
    I.see("You don't have any favorite restaurant", '#restaurantsList');
});

Scenario('liking one of the restaurants', async (I) => {
    I.see("You don't have any favorite restaurant", '#restaurantsList');

    I.amOnPage('/');

    I.seeElement('.list-item__title a');
    const firstRestaurant = locate('.list-item__title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.list');
    const likedRestaurantTitle = await I.grabTextFrom('.list-item__title a');

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('cancel liking the restaurant', async (I) => {
    I.see("You don't have any favorite restaurant", '#restaurantsList');

    I.amOnPage('/');

    I.seeElement('.list-item__title a');
    const firstRestaurant = locate('.list-item__title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.list');
    const likedRestaurantTitle = await I.grabTextFrom('.list-item__title a');
    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

    I.click(likedRestaurantTitle);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('#restaurantsList');
    const noFavoriteRestaurant = await I.grabTextFrom('#restaurantsList');

    assert.strictEqual(noFavoriteRestaurant, "You don't have any favorite restaurant");
});

Scenario('add a review in the customer review form', async (I) => {
    I.see("You don't have any favorite restaurant", '#restaurantsList');

    I.amOnPage('/');

    I.seeElement('.list-item__title a');
    I.click(locate('.list-item__title a').first());

    I.seeElement('.review_form form');

    const contentsReview = 'Makanannya Enak!';
    I.fillField('Input Name', 'Kevin');
    I.fillField('Input Review', contentsReview);

    I.click('#submit-review');

    const latestReview = locate('.customer_review').last();
    const latestContentsReview = await I.grabTextFrom(latestReview);

    assert.strictEqual(contentsReview, latestContentsReview);
});