import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Recipe from '../components/Recipe';

import AppContext from '../context/AppContext';
import IngredientsList from '../components/IngredientsList';
import Recomendations from '../components/Recomendations';
import ButtonStartRecipe from '../components/ButtonStartRecipe';

const FoodsDetails = ({ match: { params: { id } } }) => {
  const { setMealsAndDrinks, selectedRecipe } = useContext(AppContext);

  useEffect(() => {
    setMealsAndDrinks('foods', id);
  }, [id, setMealsAndDrinks]);

  const conditional = Object.keys(selectedRecipe).length > 0;

  return (
    <div>
      {conditional && (
        <div>
          <Recipe />
          <IngredientsList />
          <Recomendations />
        </div>
      )}
      <ButtonStartRecipe />
      <h1>Foods Details</h1>
      <section className="recipe-video">
        <video data-testid="video" width="400" height="400" src="">
          <track kind="captions" />
        </video>
      </section>
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
