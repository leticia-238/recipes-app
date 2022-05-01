import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { fetchRecipesData, fetchMeals, fetchDrinks } from '../utils/apiData';

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState({});

  const getIngredientsAndMeasures = (recipe) => {
    const ingredients = Object.keys(recipe).filter((key) => (
      key.includes('strIngredient') && recipe[key] !== '' && recipe[key] !== null));

    return ingredients.map((ingredient, index) => (
      `${recipe[ingredient]} - ${recipe[`strMeasure${index}`]}`));
  };

  const setMealsAndDrinks = useCallback(async (type, id) => {
    const recipe = type === 'meals' ? await fetchMeals(id) : await fetchDrinks(id);
    const options = {
      meals: {
        id: recipe[0].idMeal,
        name: recipe[0].strMeal,
        image: recipe[0].strMealThumb,
      },
      drinks: {
        id: recipe[0].idDrink,
        alcoholic: recipe[0].strAlcoholic,
        name: recipe[0].strDrink,
        image: recipe[0].strDrinkThumb,
      },
    };

    const recipeInfo = {
      type,
      category: recipe[0].strCategory,
      nationality: recipe[0].nationality,
      instructions: recipe[0].strInstructions,
      ingredientsList: getIngredientsAndMeasures(recipe[0]),
      ...options[type],
    };
    setSelectedRecipe(recipeInfo);
  }, []);

  useEffect(() => {
    const getRecipes = async () => {
      const mealsData = await fetchRecipesData('meals');
      const drinksData = await fetchRecipesData('drinks');
      setDrinks(drinksData.drinks);
      setMeals(mealsData.meals);
    };
    getRecipes();
  }, []);

  const contextValue = {
    meals,
    drinks,
    selectedRecipe,
    setMealsAndDrinks,
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
