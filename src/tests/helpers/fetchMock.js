import oneMeal from '../../../cypress/mocks/oneMeal';
import oneDrink from '../../../cypress/mocks/oneDrink';
import meals from '../../../cypress/mocks/meals';
import drinks from '../../../cypress/mocks/drinks';

import { ONE_MEAL_URL, ONE_DRINK_URL, MEALS_URL, DRINKS_URL } from './constants';

const ENDPOINTS = [
  { url: ONE_MEAL_URL, data: oneMeal },
  { url: ONE_DRINK_URL, data: oneDrink },
  { url: MEALS_URL, data: meals },
  { url: DRINKS_URL, data: drinks },
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
