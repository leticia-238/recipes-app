export const fetchMeals = async (id) => {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(ENDPOINT);
  const json = await response.json();

  return json.meals;
};

export const fetchDrinks = async (id) => {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(ENDPOINT);
  const json = await response.json();

  return json.drinks;
};

export const fetchRecipesData = async (type) => {
  const options = {
    meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  };

  const response = await fetch(options[type]);
  const data = await response.json();
  return data;
};
