import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipes from '../components/CardsRecipe';
import AppContext from '../context/AppContext';

const Drinks = ({ match: { params: { id } } }) => {
  const { contextValue: { search } } = useContext(AppContext);
  const MAX_RECIPES = 12;
  return (
    <div>
      { !id && <Header title="Drinks" /> }
      <h2>Drinks Page</h2>
      <div>
        { search.length > 0
          ? (
            search.slice(0, MAX_RECIPES).map((item, index) => (
              <CardRecipes key={ index } recipe={ item } index={ index } />
            ))
          )
          : ('')}
      </div>
      { !id && <Footer /> }
    </div>
  );
};

export default Drinks;
Drinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
