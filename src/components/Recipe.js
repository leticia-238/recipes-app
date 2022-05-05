import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import ButtonShare from './ButtonShare';

const Recipe = () => {
  const { selectedRecipe, favoriteRecipes, setFavoriteRecipes } = useContext(AppContext);

  const { id, type, nationality, category, alcoholicOrNot, name, image,
    instructions, recipeUrl } = selectedRecipe;

  const favoriteRecipe = {
    id,
    type: type === 'meals' ? 'food' : 'drink',
    category,
    alcoholicOrNot,
    nationality: nationality || '',
    name,
    image,
  };

  const [isFavorite, setIsFavorite] = useState(favoriteRecipes.some((recipe) => (
    recipe.id === id)));

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
        <input
          data-testid="favorite-btn"
          type="image"
          src={ isFavorite ? BlackHeartIcon : WhiteHeartIcon }
          alt="Favoritar Receita"
          onClick={ () => {
            setIsFavorite(!isFavorite);
            if (!isFavorite) {
              setFavoriteRecipes([...favoriteRecipes, favoriteRecipe]);
            } else {
              setFavoriteRecipes(favoriteRecipes.filter((recipe) => (
                recipe.id !== id)));
            }
          } }
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
