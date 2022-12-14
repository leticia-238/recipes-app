import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Recipe from '../components/Recipe';
import AppContext from '../context/AppContext';
import IngredientsList from '../components/IngredientsList';
import Recomendations from '../components/Recomendations';
import ButtonStartRecipe from '../components/ButtonStartRecipe';

const FoodsDetails = ({ match: { params: { id } } }) => {
  const history = useHistory();
  const {
    setMealsAndDrinks,
    selectedRecipe,
    doneRecipes,
    inProgressRecipes } = useContext(AppContext);

  const [recipeIsDone, setRecipeIsDone] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(false);

  useEffect(() => {
    setMealsAndDrinks('meals', id);
  }, [id, setMealsAndDrinks]);

  useEffect(() => {
    const isDone = doneRecipes.some((recipe) => recipe.id === id);
    setRecipeIsDone(isDone);
  }, [id, doneRecipes]);

  useEffect(() => {
    const isInProgress = inProgressRecipes.meals[id] || false;
    setRecipeInProgress(isInProgress);
  }, [id, inProgressRecipes]);

  const conditional = Object.keys(selectedRecipe).length > 0;

  return (

    <div className="container">

      {conditional && (
        <div
          className=" mb-4"
        >
          <Recipe />
          <IngredientsList />
          <Recomendations />
        </div>
      )}

      {
        !recipeIsDone && (
          <ButtonStartRecipe
            toPath={ () => { history.push(`/foods/${id}/in-progress`); } }
            title={ recipeInProgress ? 'Continue Recipe' : 'Start Recipe' }
          />
        )
      }

      <iframe
        style={ {
          marginBottom: '60px',
        } }
        className="my-12"
        width="100%"
        height="300"
        src={ selectedRecipe.video && selectedRecipe.video.replace('watch?v', 'embed/') }
        title="Recipe video"
        data-testid="video"
      />

    </div>);
};

export default FoodsDetails;

FoodsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
