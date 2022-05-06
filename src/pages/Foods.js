import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import CardRecipes from '../components/CardsRecipe';

const Foods = ({ match: { params: { id } } }) => {
  const { search } = useContext(AppContext);
  const MAX_RECIPES = 12;
  return (
    <div>
      { !id && <Header title="Foods" searchButton /> }
      <h2>Foods Page</h2>
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

export default Foods;

Foods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
