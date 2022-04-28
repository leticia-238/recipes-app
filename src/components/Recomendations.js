import React from 'react';

const Recomendations = () => {
  const { contextValue: { selectedRecipe, meals, drinks } } = useContext(AppContext);

  const sixthRecipe = 6;
  const firstSixRecipes = selectedRecipe.type === 'meals'
    ? drinks.slice(0, sixthRecipe)
    : meals.slice(0, sixthRecipe);

  return (
    <div className="recomendations-container">
      {
        firstSixRecipes.map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            className="recomendations-card"
          >
            <p
              data-testid={ `${index}-recomendation-title` }
            >
              {selectedRecipe.type === 'meals' ? recipe.strDrink : recipe.strMeal}

            </p>
            <img
              width="300px"
              src={ selectedRecipe.type === 'meals'
                ? recipe.strDrinkThumb : recipe.strMealThumb }
              alt=""
            />
          </div>))
      }
    </div>
  );
};

export default Recomendations;
