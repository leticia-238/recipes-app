import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Recipe from '../components/Recipe';
import IngredientsList from '../components/IngredientsList';
import Recomendations from '../components/Recomendations';
import ButtonStartRecipe from '../components/ButtonStartRecipe';

const DrinksDetails = ({ match: { params: { id } } }) => {
  const history = useHistory();
  const {
    setMealsAndDrinks,
    selectedRecipe,
    doneRecipes,
    inProgressRecipes } = useContext(AppContext);

  const [recipeIsDone, setRecipeIsDone] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(false);

  useEffect(() => {
    setMealsAndDrinks('cocktails', id);
  }, [id, setMealsAndDrinks]);

  useEffect(() => {
    const isDone = doneRecipes.some((recipe) => recipe.id === id);
    setRecipeIsDone(isDone);
  }, [id, doneRecipes, inProgressRecipes]);

  useEffect(() => {
    const isInProgress = inProgressRecipes.cocktails[id] || false;
    setRecipeInProgress(isInProgress);
  }, [id, inProgressRecipes]);

  const conditional = Object.keys(selectedRecipe).length > 0;

  return (
    <div className="container m-4 mx-auto">
      {
        conditional && (
          <div>
            <Recipe />
            <IngredientsList />
            <Recomendations />
          </div>
        )
      }
      {
        !recipeIsDone && (
          <ButtonStartRecipe
            toPath={ () => history.push(`/drinks/${id}/in-progress`) }
            title={ recipeInProgress ? 'Continue Recipe' : 'Start Recipe' }
          />
        )
      }

    </div>
  );
};

export default DrinksDetails;

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
