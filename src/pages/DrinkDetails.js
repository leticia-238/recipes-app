import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import Recipe from '../components/Recipe';

const DrinksDetails = ({ match: { params: { id } } }) => {
  const { contextValue: { setMealsAndDrinks } } = useContext(AppContext);
  useEffect(() => {
    setMealsAndDrinks('drinks', id);
  }, [id, setMealsAndDrinks]);
  return (
    <div>
      <Recipe />
      <h1>Drinks Details</h1>
    </div>);
};

export default DrinksDetails;

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
