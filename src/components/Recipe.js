import React, { useCallback, useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

const Recipe = () => {
  const { contextValue: { selectedRecipe, meals, drinks } } = useContext(AppContext);
  const [renderIngredients, setRenderIngredients] = useState([]);
  const sixthRecipe = 6;
  const firstSixRecipes = selectedRecipe.type === 'meals'
    ? drinks.slice(0, sixthRecipe)
    : meals.slice(0, sixthRecipe);

  const countIngredients = useCallback(() => {
    const temp = [];
    for (let index = 1; index < selectedRecipe.totalOfIngredients + 1; index += 1) {
      temp.push(
        `${
          selectedRecipe[`strIngredient${index}`]} -
          ${selectedRecipe[`strMeasure${index}`]}`,
      );
    }
    return temp;
  }, [selectedRecipe]);
  useEffect(() => {
    setRenderIngredients(countIngredients());
  }, [countIngredients]);

  return (
    <section className="recipe">
      <img data-testid="recipe-photo" src={ selectedRecipe.image } alt="recipe" />
      <h2 data-testid="recipe-title">{selectedRecipe.name}</h2>
      <p data-testid="recipe-category">
        {selectedRecipe.category}
        {' '}
        {
          selectedRecipe.alcoholic ? selectedRecipe.alcoholic : ''
        }

      </p>
      <div className="recipes-buttons">
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
      </div>

      <section className="recipe-ingredients">
        <h3>Ingredientes</h3>
        {
          renderIngredients.length > 0 && renderIngredients.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </p>))
        }

      </section>

      <section className="recipe-instructions">
        <h3>Como Preparar</h3>
        <p data-testid="instructions">{selectedRecipe.instructions}</p>
      </section>

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

      <button className="recipe-btn" data-testid="start-recipe-btn" type="button">
        Start Recipe
      </button>
    </section>);
};

export default Recipe;

// Recipe.propTypes = {
//   title: PropTypes.string.isRequired,
//   thumb: PropTypes.string.isRequired,
// };
