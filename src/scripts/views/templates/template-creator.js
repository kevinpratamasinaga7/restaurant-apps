import CONFIG from '../../globals/config';

const createRestaurantListTemplate = (restaurantList) => `
    <article class="list-item">
        <img class="list-item__thumbnail lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurantList.pictureId}" alt="${restaurantList.name}" title="${restaurantList.name}">
        <div class="list-item__content">
            <p class="list-item__rating">Rating: ⭐️${restaurantList.rating}</p>
            <h1 class="list-item__title"><a href="${`/#/detail/${restaurantList.id}`}">${restaurantList.name}</a></h1>
            <h2 class="list-item__city">City: ${restaurantList.city}</h2>
            <p class="list-item__description">${restaurantList.description}</p>
        </div>
    </article>
`;

const createRestaurantDetailTemplate = (restaurantDetail) => `
    <h2 class="restaurant__title">${restaurantDetail.restaurant.name}</h2>
    <img class="restaurant__poster lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurantDetail.restaurant.pictureId}" alt="${restaurantDetail.restaurant.name}" />
    <div class="restaurant__info">
      <h3>Information</h3>
        <h4>Address</h4>
        <p>${restaurantDetail.restaurant.address}</p>
        <h4>City</h4>
        <p>${restaurantDetail.restaurant.city}</p>
    </div>
    <div class="restaurant__overview">
      <h3>Description</h3>
      <p>${restaurantDetail.restaurant.description}</p>
    </div>
`;

const createFoodMenu = (foods) => {
  let content = `
    <div class="restaurant__overview">
      <h3>Food Menu</h3>
  `;
  foods.forEach((food) => {
    content += `<ul>
                  <li>${food.name}</li>
                </ul>`;
  });
  content += `
              </div>
            `;
  return content;
};

const createDrinkMenu = (drinks) => {
  let content = `
    <div class="restaurant__overview">
      <h3>Drink Menu</h3>
  `;
  drinks.forEach((drink) => {
    content += `<ul>
                  <li>${drink.name}</li>
                </ul>`;
  });
  content += `
              </div>
            `;
  return content;
};

const createCustomerReviews = (customerReviews) => {
  let content = `
    <div class="restaurant__overview">
      <h3>Customer Reviews</h3>
      <table>
        <tr>
          <th>Name</th>
          <th>Review</th>
          <th>Date</th>
        </tr>
  `;
  customerReviews.forEach((customer) => {
    content += `<tr>
                  <td>${customer.name}</td>
                  <td class="customer_review">${customer.review}</td>
                  <td>${customer.date}</td>
                </tr>
              `;
  });
  content += `
                </table>
              </div>  
            `;
  return content;
};

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantListTemplate,
  createRestaurantDetailTemplate,
  createFoodMenu,
  createDrinkMenu,
  createCustomerReviews,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
