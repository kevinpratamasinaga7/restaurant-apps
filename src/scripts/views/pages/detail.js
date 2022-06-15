import UrlParser from '../../routes/url-parser';
import RestaurantAPISource from '../../data/restaurant-api-source';
import {
  createRestaurantDetailTemplate,
  createFoodMenu,
  createDrinkMenu,
  createCustomerReviews,
} from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import ReviewForm from '../../utils/review-form-initiator';
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';

const Detail = {
  async render() {
    return `
      <section class="content">
        <div class="explore">
          <h1 class="explore__label">Restaurant Detail</h1>
        </div>
      </section>
      <div id="restaurant" class="restaurant"></div>
      <br>
      <div class="review_form">
        <form>
          <label for="inputName" class="label_text">Name</label>
          <input type="text" id="inputName" name="Input Name" aria-label="input name">
          <label for="inputReview" class="label_text">Review</label>
          <input type="text" id="inputReview" name="Input Review" aria-label="input review">
          <input type="submit" value="Submit" class="btn_submit" id="submit-review" aria-label="submit your review">
        </form>
      </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantDetail = await RestaurantAPISource.detailRestaurant(url.id);
    const { foods, drinks } = restaurantDetail.restaurant.menus;
    const { customerReviews } = restaurantDetail.restaurant;
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML += createRestaurantDetailTemplate(restaurantDetail);
    restaurantContainer.innerHTML += createFoodMenu(foods);
    restaurantContainer.innerHTML += createDrinkMenu(drinks);
    restaurantContainer.innerHTML += createCustomerReviews(customerReviews);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurantDetail.restaurant.id,
        name: restaurantDetail.restaurant.name,
        description: restaurantDetail.restaurant.description,
        city: restaurantDetail.restaurant.city,
        address: restaurantDetail.restaurant.address,
        pictureId: restaurantDetail.restaurant.pictureId,
        rating: restaurantDetail.restaurant.rating,
      },
    });

    const btnSubmit = document.querySelector('#submit-review');
    const nameInput = document.querySelector('#inputName');
    const reviewInput = document.querySelector('#inputReview');

    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      if (nameInput.value === '' || reviewInput.value === '') {
        alert('The form cannot be empty, please fill it completely');
        nameInput.value = '';
        reviewInput.value = '';
      } else {
        ReviewForm(url, nameInput.value, reviewInput.value);
        nameInput.value = '';
        reviewInput.value = '';
      }
    });
  },
};

export default Detail;
