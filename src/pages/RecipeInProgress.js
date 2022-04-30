import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Recipe from '../components/Recipe';
import AppContext from '../context/AppContext';
import IngredientsCheckList from '../components/IngredientsCheckList';

const RecipeInProgress = ({ match: { params: { id } } }) => {
  const { setMealsAndDrinks, ingredientsList = [],
    selectedRecipe } = useContext(AppContext);

  const { pathname } = useLocation();
  const type = pathname.includes('foods') ? 'meals' : 'drinks';

  const props = { ingredientsList, type, id };

  useEffect(() => {
    setMealsAndDrinks(type, id);
  }, [setMealsAndDrinks, id, type]);

  const conditional = ingredientsList.length > 0
  && Object.keys(selectedRecipe).length > 0;

  return (
    <div>
      <div>
        <Recipe />
        {conditional
           && (<IngredientsCheckList { ...props } />)}
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
