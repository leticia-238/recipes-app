import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import Recipe from '../components/Recipe';
import IngredientsList from '../components/IngredientsList';
import Recomendations from '../components/Recomendations';
import ButtonStartRecipe from '../components/ButtonStartRecipe';

const DrinksDetails = ({ match: { params: { id } } }) => {
  const { setMealsAndDrinks, selectedRecipe } = useContext(AppContext);

  useEffect(() => {
    setMealsAndDrinks('drinks', id);
  }, [id, setMealsAndDrinks]);

  const conditional = Object.keys(selectedRecipe).length > 0;

  return (
    <div>
      {
        conditional && (
          <div>
            <Recipe />
            <IngredientsList />
            <Recomendations />
          </div>
        )
      }
      <ButtonStartRecipe />
      <h1>Drinks Details</h1>
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
