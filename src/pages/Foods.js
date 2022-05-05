import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import CardRecipes from '../components/CardsRecipe';
import { getFoodsCategory } from '../utils/apiData';

const Foods = ({ match: { params: { id } } }) => {
  const { search, meals } = useContext(AppContext);
  const MAX_RECIPES = 12;
  const MAX_CATEGORY = 5;
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const data = await getFoodsCategory();
      setCategory(data);
    };
    getCategory();
  }, []);
  return (
    <div>
      { !id && <Header title="Foods" /> }
      {
        category.slice(0, MAX_CATEGORY).map((item, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${item.strCategory}-category-filter` }
          >
            { item.strCategory }
          </button>))
      }
      <h2>Foods Page</h2>
      <div>
        { search.length > 0
          && (
            search.slice(0, MAX_RECIPES).map((item, index) => (
              <CardRecipes key={ index } recipe={ item } index={ index } />
            ))
          )}
        {
          meals.slice(0, MAX_RECIPES).map((item, index) => (
            <CardRecipes key={ index } recipe={ item } index={ index } />
          ))
        }
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
