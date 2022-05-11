import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipes from '../components/CardsRecipe';
import AppContext from '../context/AppContext';
import { getDrinksCategory, getDrinksByCategoryName } from '../utils/apiData';

const Drinks = ({ match: { params: { id } } }) => {
  const history = useHistory();
  const { search, mealsAndDrinksData: { drinks } } = useContext(AppContext);
  const MAX_RECIPES = 12;
  const [selectedCategory, setSelectedCategory] = useState('');
  const MAX_CATEGORY = 5;
  const [category, setCategory] = useState([]);
  const [drinksByCategory, setDrinksByCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const data = await getDrinksCategory();
      setCategory(data);
    };
    getCategory();
  }, []);
  const getItensByCategory = async (name) => {
    if (selectedCategory === name) {
      setDrinksByCategory([]);
    } else {
      const data = await getDrinksByCategoryName(name);
      setDrinksByCategory(data);
    }
    setSelectedCategory(name);
  };
  return (
    <>
      {' '}
      { !id && <Header title="Drinks" searchButton /> }
      <div className="container align-items-center py-4">

        <div
          style={ { gap: '8px', display: 'grid' } }
          className="p-2  custom-grid"
        >
          <button
            className="button-filter col"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => setDrinksByCategory([]) }
          >
            All

          </button>

          {
            category.slice(0, MAX_CATEGORY).map((item, index) => (
              <button
                onClick={ () => getItensByCategory(item.strCategory) }
                type="button"
                className="button-filter col"
                key={ index }
                data-testid={ `${item.strCategory}-category-filter` }
              >
                { item.strCategory }
              </button>))
          }
        </div>
        <div
          style={ { gap: '16px' } }
          className="
        pt-2
       custom-grid"
        >
          { search.length > 0
          && (
            search.slice(0, MAX_RECIPES).map((item, index) => (
              <CardRecipes key={ index } recipe={ item } index={ index } />
            ))
          )}

          {
            drinksByCategory.length > 0 ? (
              drinksByCategory.slice(0, MAX_RECIPES).map((item, index) => (
                <CardRecipes
                  key={ index }
                  recipe={ item }
                  index={ index }
                  toPath={ () => history.push(`/drinks/${item.idDrink}`) }
                />
              )))
              : drinks.slice(0, MAX_RECIPES).map((item, index) => (
                <CardRecipes
                  key={ index }
                  recipe={ item }
                  toPath={ () => history.push(`/drinks/${item.idDrink}`) }
                  index={ index }
                />
              ))
          }
        </div>

      </div>
      { !id && <Footer /> }
    </>
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
