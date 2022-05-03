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

  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

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
      setDrinks(drinksData.drinks);
      setMeals(mealsData.meals);
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
    const recipeUrl = type === 'meals' ? `http://localhost:3000/foods/${id}` : `http://localhost:3000/drinks/${id}`;

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
      ...options[type],
      recipeUrl,
    };
    setSelectedRecipe(recipeInfo);
  }, [getIngredientsAndMeasures]);

  const contextValue = {
    meals,
    drinks,
    selectedRecipe,
    setMealsAndDrinks,
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
