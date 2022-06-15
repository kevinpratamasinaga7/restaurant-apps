import RestaurantAPISource from '../data/restaurant-api-source';

const ReviewForm = (url, name, review) => {
  const dataInput = {
    id: url.id,
    name,
    review,
  };
  RestaurantAPISource.postRestaurant(dataInput);

  const reviewList = document.querySelector('.restaurant__overview');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date().toLocaleDateString('id-ID', options);
  const newReview = `
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Review</th>
                            <th>Date</th>
                        </tr>
                        <tr>
                            <td>${name}</td>
                            <td>${review}</td>
                            <td>${date}</td>
                        </tr>
                    </table>
                    `;
  reviewList.innerHTML += newReview;
};

export default ReviewForm;
