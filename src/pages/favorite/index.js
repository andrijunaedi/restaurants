import nprogress from 'nprogress/nprogress';

import Heroes from '../../components/heroes';
import restaurantCard from '../../components/restaurant/restaurantCard';
import RestaurantIdb from '../../services/restaurantIdb';

const Favorite = {
  async render() {
    new Heroes(document.querySelector('.heroes')).hide();
    nprogress.start();

    return `<section id="restaurants" class="restaurants">
    <div class="tagline">
      <h1 tabindex="0">Favorite Restaurants</h1>
    </div>
    <div id="favorite" class="restaurants-list"></div>
  </section>`;
  },

  async afterRender() {
    const restaurants = await RestaurantIdb.getAll();
    nprogress.done();
    const restaurantsList = document.querySelector(
      '.restaurants-list',
    );

    if (restaurants.length === 0) {
      restaurantsList.innerHTML = `<span class="no-favorite"> You do not have any favorite Restaurant Here.</span>`;
    } else {
      restaurants.forEach((restaurant) =>
        restaurantCard(restaurantsList, restaurant),
      );
    }
  },
};

export default Favorite;
