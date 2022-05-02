import React, { useCallback, useContext, useState } from 'react';
import copy from 'clipboard-copy';
import AppContext from '../context/AppContext';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

const Recipe = () => {
  const { selectedRecipe, favoriteRecipes, setFavoriteRecipes } = useContext(AppContext);

  const { id, type, nationality, category, alcoholicOrNot, name, image,
    instructions, recipeUrl } = selectedRecipe;
  console.log(recipeUrl);
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

  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleShareClick = useCallback(() => {
    setIsLinkCopied(true);
    copy(recipeUrl);
    const messageTime = 5000;
    setInterval(() => {
      setIsLinkCopied(false);
    }, messageTime);
  }, [recipeUrl]);

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
        <input
          data-testid="share-btn"
          type="image"
          src={ ShareIcon }
          alt="Compartilhar Receita"
          onClick={ handleShareClick }
        />
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
        {isLinkCopied && <span>Link copied!</span>}
      </div>

      <section className="recipe-instructions">
        <h3>Como Preparar</h3>
        <p data-testid="instructions">{instructions}</p>
      </section>
    </section>
  );
};

export default Recipe;
