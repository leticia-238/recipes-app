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
    <div className="recipe">
      <img
        style={ { width: '100%' } }
        className="img-fluid"
        data-testid="recipe-photo"
        src={ image }
        alt=""
      />
      <div
        className="
      d-flex
      align-items-start
      justify-content-between
      px-2
      "
      >
        <div className="recipe-info">
          <h2 className="recipe-title" data-testid="recipe-title">{name}</h2>
          <p className="recipe-category" data-testid="recipe-category">
            {category}
            {' '}
            { alcoholicOrNot }
          </p>
        </div>
        <div
          style={ { gap: '8px' } }
          className="recipes-buttons d-flex justify-content-between px-2 py-2"
        >
          <ButtonShare testid="share-btn" url={ recipeUrl } />
          <ButtonFavorite
            testid="favorite-btn"
            selectedRecipe={ selectedRecipe }
            defaultState={ favoriteRecipes.some((recipe) => (recipe.id === id)) }
          />
        </div>
      </div>
      <section className="recipe-instructions mb-4 p-4">
        <h3 className="pb-2">How to prepare</h3>
        <p className="instructions" data-testid="instructions">{instructions}</p>
      </section>
    </div>
  );
};

export default Recipe;
