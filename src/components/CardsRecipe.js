import React from 'react';
import PropTypes from 'prop-types';

const CardRecipes = ({ recipe, index, toPath }) => (

  <div
    style={ {
      boxShadow: 'var(--box-shadow)',
      overflow: 'auto' } }
    className="card "
    tabIndex={ 0 }
    role="button"
    onClick={ () => toPath() }
    onKeyDown={ () => toPath() }
    data-testid={ `${index}-recipe-card` }
  >
    <img
      width="100%"
      data-testid={ `${index}-card-img` }
      src={ recipe.strMealThumb || recipe.strDrinkThumb }
      alt={ recipe.strMeal || recipe.strDrink }
    />

    <div
      style={ {
        height: '100px',
      } }
      className="card-body"
    >
      <h6 className="card-title text-center fo" data-testid={ `${index}-card-name` }>
        { recipe.strMeal || recipe.strDrink }
      </h6>
    </div>

  </div>

);

CardRecipes.propTypes = {
  toPath: PropTypes.func.isRequired,
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipes;
