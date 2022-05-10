import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';

const ButtonFavorite = ({ testid, selectedRecipe, defaultState }) => {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(AppContext);
  const { id, type, nationality, category, alcoholicOrNot, name, image } = selectedRecipe;

  const [isFavorite, setIsFavorite] = useState(defaultState);

  const favoriteRecipe = {
    id,
    type: type === 'meals' ? 'food' : 'drink',
    category,
    alcoholicOrNot,
    nationality: nationality || '',
    name,
    image,
  };

  const favorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setFavoriteRecipes([...favoriteRecipes, favoriteRecipe]);
    } else {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => (
        recipe.id !== id)));
    }
  };

  return (
    <div>
      <input
        data-testid={ testid }
        type="image"
        src={ isFavorite ? BlackHeartIcon : WhiteHeartIcon }
        alt="Favoritar Receita"
        onClick={ favorite }
      />
    </div>
  );
};

ButtonFavorite.propTypes = {
  testid: PropTypes.string.isRequired,
  selectedRecipe: PropTypes.objectOf(PropTypes.any).isRequired,
  defaultState: PropTypes.bool.isRequired,
};

export default ButtonFavorite;
