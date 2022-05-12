import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Recipe from '../components/Recipe';
import IngredientsCheckList from '../components/IngredientsCheckList';
import AppContext from '../context/AppContext';

const RecipeInProgress = ({ match: { params: { id } } }) => {
  const { pathname } = useLocation();

  const { selectedRecipe, setMealsAndDrinks } = useContext(AppContext);

  useEffect(() => {
    const type = pathname.includes('foods') ? 'meals' : 'cocktails';
    setMealsAndDrinks(type, id);
  }, [setMealsAndDrinks, id, pathname]);

  const conditional = Object.keys(selectedRecipe).length > 0;

  return (
    <div className="container">
      {conditional && (
        <div
          style={ {
            marginBottom: '60px',
          } }
        >
          <Recipe />
          <IngredientsCheckList />
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
