import RestaurantAPISource from '../../data/restaurant-api-source';
import { createRestaurantListTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section class="content">
        <div class="explore">
          <h1 class="explore__label">Restaurant List</h1>
          <div class="list" id="restaurantsList">
          
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantAPISource.listOfRestaurant();
    const listOfRestaurant = restaurants.restaurants;
    const restaurantsContainer = document.querySelector('#restaurantsList');
    listOfRestaurant.forEach((restaurantList) => {
      restaurantsContainer.innerHTML += createRestaurantListTemplate(restaurantList);
    });
  },
};

export default Home;
