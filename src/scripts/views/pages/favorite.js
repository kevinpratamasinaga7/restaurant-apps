import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import { createRestaurantListTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <section class="content">
        <div class="explore">
          <h1 class="explore__label">Favorite Restaurant List</h1>
          <div class="list" id="restaurantsList">
    
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurantsList');
    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = '<h2 style="text-align: center;">You don\'t have any favorite restaurant</h2>';
    }
    restaurants.forEach((restaurantList) => {
      restaurantsContainer.innerHTML += createRestaurantListTemplate(restaurantList);
    });
  },
};

export default Favorite;
