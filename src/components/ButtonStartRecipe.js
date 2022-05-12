import React from 'react';
import PropTypes from 'prop-types';

const ButtonStartRecipe = ({ title = 'Start Recipe', toPath }) => (
  <button
    className="button-recipe"
    data-testid="start-recipe-btn"
    onClick={ () => toPath() }
    type="button"
  >
    {title}
  </button>
);

export default ButtonStartRecipe;

ButtonStartRecipe.propTypes = {
  title: PropTypes.string.isRequired,
  toPath: PropTypes.func.isRequired,
};
