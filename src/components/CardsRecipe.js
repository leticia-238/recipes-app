import React from 'react';
import PropTypes from 'prop-types';

const CardRecipes = ({ recipe, index }) => (
  <div>
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
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipes;
