import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import CardRecipes from '../components/CardsRecipe';
import { getFoodsCategory, getFoodsByCategoryName } from '../utils/apiData';

const Foods = ({ match: { params: { id } } }) => {
  const history = useHistory();
  const { search, mealsAndDrinksData: { meals } } = useContext(AppContext);
  const MAX_RECIPES = 12;
  const MAX_CATEGORY = 5;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category, setCategory] = useState([]);
  const [mealsByCategory, setMealsByCategory] = useState([]);
  const [maxRecipes, setMaxRecipes] = useState(MAX_RECIPES);
  useEffect(() => {
    const getCategory = async () => {
      const data = await getFoodsCategory();
      setCategory(data);
    };
    getCategory();
  }, []);
  const getItensByCategory = async (name) => {
    if (selectedCategory === name) {
      setMealsByCategory([]);
      setMaxRecipes(MAX_RECIPES);
    } else {
      const data = await getFoodsByCategoryName(name);
      setMealsByCategory(data);
    }
    setSelectedCategory(name);
  };
  return (
    <div>
      { !id && <Header title="Foods" searchButton /> }
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setMaxRecipes(meals.length) }
        >
          All

        </button>
        {
          category.slice(0, MAX_CATEGORY).map((item, index) => (
            <button
              onClick={ () => getItensByCategory(item.strCategory) }
              type="button"
              key={ index }
              data-testid={ `${item.strCategory}-category-filter` }
            >
              { item.strCategory }
            </button>))
        }
      </div>
      <div>
        { search.length > 0
          && (
            search.slice(0, MAX_RECIPES).map((item, index) => (
              <CardRecipes key={ index } recipe={ item } index={ index } />
            ))
          )}
        {
          mealsByCategory.length > 0 ? (
            mealsByCategory.slice(0, MAX_RECIPES).map((item, index) => (
              <CardRecipes
                key={ index }
                recipe={ item }
                index={ index }
                toPath={ () => history.push(`/foods/${item.idMeal}`) }
              />
            )))
            : meals.slice(0, maxRecipes).map((item, index) => (
              <CardRecipes
                key={ index }
                recipe={ item }
                toPath={ () => history.push(`/foods/${item.idMeal}`) }
                index={ index }
              />
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
