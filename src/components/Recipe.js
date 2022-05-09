import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import ButtonFavorite from './ButtonFavorite';
import ButtonShare from './ButtonShare';

const Recipe = () => {
  const {
    selectedRecipe: {
      id, name, image, recipeUrl, instructions, alcoholicOrNot, category,
    },
    selectedRecipe,
    favoriteRecipes,
  } = useContext(AppContext);

  return (
    <section className="recipe">
      <img data-testid="recipe-photo" src={ image } alt="" />
      <h2 data-testid="recipe-title">{name}</h2>
      <p data-testid="recipe-category">
        {category}
        {' '}
        { alcoholicOrNot }
      </p>
      <div className="recipes-buttons">
        <ButtonShare testid="share-btn" url={ recipeUrl } />
        <ButtonFavorite
          testid="favorite-btn"
          selectedRecipe={ selectedRecipe }
          defaultState={ favoriteRecipes.some((recipe) => (recipe.id === id)) }
        />
      </div>
      <section className="recipe-instructions">
        <h3>Como Preparar</h3>
        <p data-testid="instructions">{instructions}</p>
      </section>
    </section>
  );
};

export default Recipe;
