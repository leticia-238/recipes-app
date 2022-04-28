import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { fetchDrinks, fetchMeals, fetchRecipesData } from '../utils/apiData';

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [ingredientsList, setIngredientsList] = useState([]);

  const getIngredientOrMeasure = (obj, item) => {
    const result = Object.fromEntries(
      Object.entries(obj)
        .filter(([key, value]) => key.includes(item)
        && (value !== null && value !== '')),
    );
    return result;
  };

  const getIngredientList = (recipe, totalOfIngredients) => {
    const list = [];
    for (let index = 1; index < totalOfIngredients + 1; index += 1) {
      list.push(
        `${recipe[`strIngredient${index}`]} - ${recipe[`strMeasure${index}`]}`,
      );
    }
    // console.log(list);
    setIngredientsList(list);
  };

  const setMealsAndDrinks = useCallback(async (type, id) => {
    const recipe = type === 'meals' ? await fetchMeals(id) : await fetchDrinks(id);
    const ingredients = getIngredientOrMeasure(recipe[0], 'Ingredient');
    const measure = getIngredientOrMeasure(recipe[0], 'Measure');
    const totalOfIngredients = Object.keys(ingredients).length;
    const options = {
      meals: {
        id: recipe[0].idMeal,
        type,
        category: recipe[0].strCategory,
        nationality: recipe[0].nationality,
        name: recipe[0].strMeal,
        image: recipe[0].strMealThumb,
        ...ingredients,
        ...measure,
        instructions: recipe[0].strInstructions,
        totalOfIngredients,
      },
      drinks: {
        id: recipe[0].idDrink,
        type,
        category: recipe[0].strCategory,
        nationality: recipe[0].nationality,
        alcoholic: recipe[0].strAlcoholic,
        name: recipe[0].strDrink,
        image: recipe[0].strDrinkThumb,
        instructions: recipe[0].strInstructions,
        ...ingredients,
        ...measure,
        totalOfIngredients,
      },
    };
    getIngredientList(options[type], totalOfIngredients);
    setSelectedRecipe(options[type]);
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
    setSelectedRecipe,
    ingredientsList,
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
