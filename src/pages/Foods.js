import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import CardRecipes from '../components/CardsRecipe';
import { getFoodsCategory, getFoodsByCategoryName } from '../utils/apiData';

const Foods = ({ match: { params: { id } } }) => {
  const { search, mealsAndDrinksData: { meals } } = useContext(AppContext);
  const MAX_RECIPES = 12;
  const MAX_CATEGORY = 5;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category, setCategory] = useState([]);
  const [mealsByCategory, setMealsByCategory] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const data = await getFoodsCategory();
      setCategory(data);
    };
    getCategory();
  }, []);
  useEffect(() => {
    const getItensByCategory = async () => {
      const data = await getFoodsByCategoryName(selectedCategory);
      setMealsByCategory(data);
    };
    getItensByCategory();
  }, [selectedCategory]);
  return (
    <div>
      { !id && <Header title="Foods" searchButton /> }
      {
        category.slice(0, MAX_CATEGORY).map((item, index) => (
          <button
            onClick={ () => setSelectedCategory(item.strCategory) }
            type="button"
            key={ index }
            data-testid={ `${item.strCategory}-category-filter` }
          >
            { item.strCategory }
          </button>))
      }

      <div>
        { search.length > 0
          && (
            search.slice(0, MAX_RECIPES).map((item, index) => (
              <CardRecipes key={ index } recipe={ item } index={ index } />
            ))
          )}
        {
          selectedCategory.length > 0 ? (
            mealsByCategory.slice(0, MAX_RECIPES).map((item, index) => (
              <CardRecipes key={ index } recipe={ item } index={ index } />
            )))
            : meals.slice(0, MAX_RECIPES).map((item, index) => (
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
