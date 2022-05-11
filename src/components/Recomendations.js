import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Recomendations = () => {
  const { selectedRecipe,
    mealsAndDrinksData: { meals, drinks } } = useContext(AppContext);

  const sixthRecipe = 6;
  const firstSixRecipes = selectedRecipe.type === 'meals'
    ? [...drinks].slice(0, sixthRecipe)
    : [...meals].slice(0, sixthRecipe);

  return (
    <div className="recomendations-container container-fluid d-flex">
      {
        firstSixRecipes.map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            className="recomendations-card"
          >

            <img
              width="250px"
              src={ selectedRecipe.type === 'meals'
                ? recipe.strDrinkThumb : recipe.strMealThumb }
              alt=""
            />

            <h4
              className="p-2"
              data-testid={ `${index}-recomendation-title` }
            >
              {selectedRecipe.type === 'meals' ? recipe.strDrink : recipe.strMeal}

            </h4>
          </div>))
      }
    </div>
  );
};

export default Recomendations;
