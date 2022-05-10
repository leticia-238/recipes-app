import React from 'react';
import PropTypes from 'prop-types';

const CardRecipes = ({ recipe, index, toPath }) => (
  <div
    tabIndex={ 0 }
    role="button"
    onClick={ () => toPath() }
    onKeyDown={ () => toPath() }
  >
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />
      <p data-testid={ `${index}-card-name` }>
        { recipe.strMeal || recipe.strDrink }
      </p>
    </div>
  </div>
);

CardRecipes.propTypes = {
  toPath: PropTypes.func.isRequired,
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipes;
