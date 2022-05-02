import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Recipe from '../components/Recipe';
import IngredientsCheckList from '../components/IngredientsCheckList';
import AppContext from '../context/AppContext';

const RecipeInProgress = ({ match: { params: { id } } }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const { selectedRecipe, setMealsAndDrinks, doneRecipes } = useContext(AppContext);

  useEffect(() => {
    const type = pathname.includes('foods') ? 'foods' : 'drinks';
    setMealsAndDrinks(type, id);
  }, [setMealsAndDrinks, id, pathname]);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const isRecipeDone = doneRecipes.some((recipe) => (recipe.id === id));
    setIsDisabled(!isRecipeDone);
  }, [doneRecipes, id]);

  const conditional = Object.keys(selectedRecipe).length > 0;

  return (
    <div>
      {conditional && (
        <div>
          <Recipe />
          <IngredientsCheckList />
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ isDisabled }
            onClick={ () => {
              history.push('/done-recipes');
            } }
          >
            FinishRecipe
          </button>
        </div>
      )}
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
