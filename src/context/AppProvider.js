import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { fetchRecipesData, fetchMeals, fetchDrinks } from '../utils/apiData';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const AppProvider = ({ children }) => {
  const [inProgressRecipes, setInProgressRecipes] = useState(
    { meals: {}, cocktails: {} },
  );
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const [mealsAndDrinksData, setMealsAndDrinksData] = useState(
    { meals: [], drinks: [] },
  );

  const [search, setSearch] = useState([]);

  useEffect(() => {
    const savedInProgressRecipes = getLocalStorage('inProgressRecipes');
    const savedDoneRecipes = getLocalStorage('doneRecipes');
    const savedFavoriteRecipes = getLocalStorage('favoriteRecipes');

    if (savedInProgressRecipes) {
      setInProgressRecipes(savedInProgressRecipes);
    }
    if (savedDoneRecipes) {
      setDoneRecipes(savedDoneRecipes);
    }
    if (savedFavoriteRecipes) {
      setFavoriteRecipes(savedFavoriteRecipes);
    }

    const getRecipes = async () => {
      const mealsData = await fetchRecipesData('meals');
      const drinksData = await fetchRecipesData('drinks');
      setMealsAndDrinksData({
        meals: mealsData.meals,
        drinks: drinksData.drinks,
      });
    };
    getRecipes();
  }, []);

  useEffect(() => {
    setLocalStorage('inProgressRecipes', inProgressRecipes);
  }, [inProgressRecipes]);

  useEffect(() => {
    setLocalStorage('doneRecipes', doneRecipes);
  }, [doneRecipes]);

  useEffect(() => {
    setLocalStorage('favoriteRecipes', favoriteRecipes);
  }, [favoriteRecipes]);

  const [selectedRecipe, setSelectedRecipe] = useState({});

  const getIngredientsAndMeasures = useCallback((recipe) => {
    const ingredients = Object.keys(recipe).filter((key) => (
      key.includes('strIngredient') && recipe[key] !== '' && recipe[key] !== null));

    return ingredients.map((ingredient, index) => (
      `${recipe[ingredient]} - ${recipe[`strMeasure${index + 1}`]}`));
  }, []);

  const setMealsAndDrinks = useCallback(async (type, id) => {
    const recipe = type === 'meals' ? await fetchMeals(id) : await fetchDrinks(id);
    const recipeType = type === 'meals' ? 'foods' : 'drinks';
    const recipeUrl = `http://localhost:3000/${recipeType}/${id}`;

    const options = {
      meals: {
        id: recipe[0].idMeal,
        name: recipe[0].strMeal,
        image: recipe[0].strMealThumb,
        alcoholicOrNot: '',
      },
      cocktails: {
        id: recipe[0].idDrink,
        name: recipe[0].strDrink,
        image: recipe[0].strDrinkThumb,
        alcoholicOrNot: recipe[0].strAlcoholic,
      },
    };

    const recipeInfo = {
      type,
      category: recipe[0].strCategory,
      nationality: recipe[0].strArea,
      instructions: recipe[0].strInstructions,
      ingredientsList: getIngredientsAndMeasures(recipe[0]),
      tags: recipe[0].strTags ? recipe[0].strTags.split(',') : [],
      video: recipe[0].strYoutube,
      ...options[type],
      recipeUrl,
    };
    setSelectedRecipe(recipeInfo);
  }, [getIngredientsAndMeasures]);

  const contextValue = {
    mealsAndDrinksData,
    selectedRecipe,
    search,
    setMealsAndDrinks,
    setSelectedRecipe,
    setSearch,
    inProgressRecipes,
    setInProgressRecipes,
    doneRecipes,
    setDoneRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
