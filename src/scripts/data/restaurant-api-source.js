import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantAPISource {
  static async listOfRestaurant() {
    const response = await fetch(API_ENDPOINT.HOME);
    return response.json();
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async postRestaurant(data) {
    const rawResponse = await fetch(API_ENDPOINT.POST_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return rawResponse;
  }
}

export default RestaurantAPISource;
