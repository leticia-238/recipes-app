import oneMeal from '../../../cypress/mocks/oneMeal';
import oneDrink from '../../../cypress/mocks/oneDrink';
import meals from '../../../cypress/mocks/meals';
import drinks from '../../../cypress/mocks/drinks';
import areas from '../../../cypress/mocks/areas';
import mealCategories from '../../../cypress/mocks/mealCategories';
import drinkCategories from '../../../cypress/mocks/drinkCategories';
import mealIngredients from '../../../cypress/mocks/mealIngredients';
import drinkIngredients from '../../../cypress/mocks/drinkIngredients';

import { ONE_MEAL_URL, ONE_DRINK_URL, MEALS_URL, DRINKS_URL,
  LIST_AREAS_URL, MEAL_CATEGORIES_URL, DRINK_CATEGORIES_URL, INGREDIENTS_MEAL_URL,
  INGREDIENTS_DRINK_URL } from './constants';

const ENDPOINTS = [
  { url: ONE_MEAL_URL, data: oneMeal },
  { url: ONE_DRINK_URL, data: oneDrink },
  { url: MEALS_URL, data: meals },
  { url: DRINKS_URL, data: drinks },
  { url: LIST_AREAS_URL, data: areas },
  { url: MEAL_CATEGORIES_URL, data: mealCategories },
  { url: DRINK_CATEGORIES_URL, data: drinkCategories },
  { url: INGREDIENTS_MEAL_URL, data: mealIngredients },
  { url: INGREDIENTS_DRINK_URL, data: drinkIngredients },
];

const fetchMock = (receivedUrl) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    const result = ENDPOINTS.find(({ url }) => url === receivedUrl);
    return result
      ? Promise.resolve(result.data)
      : Promise.reject(new Error('Invalid url'));
  },
});

export default fetchMock;
