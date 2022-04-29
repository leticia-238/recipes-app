import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Recipe from '../components/Recipe';
import AppContext from '../context/AppContext';
import IngredientsCheckList from '../components/IngredientsCheckList';

const RecipeInProgress = ({ match: { params: { id } } }) => {
  const { setMealsAndDrinks } = useContext(AppContext);

  const { pathname } = useLocation();
  const type = pathname.includes('foods') ? 'meals' : 'drinks';

  useEffect(() => {
    setMealsAndDrinks(type, id);
  }, [id, setMealsAndDrinks, type]);

  return (
    <div>
      <div>
        <Recipe />
        <IngredientsCheckList />
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          FinishRecipe
        </button>
      </div>
    </div>);
};

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
