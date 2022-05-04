import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { getFoodByIngredient, getFoodByName, getFoodByLetter,
  getDrinkByIngredient, getDrinkByName, getDrinkByLetter } from '../utils/apiData';
import AppContext from '../context/AppContext';

const HeaderSearchBar = ({ searchInput }) => {
  const { contextValue: { search, setSearch } } = useContext(AppContext);
  const [radioSearch, setRadioSearch] = useState('');
  const location = useLocation();
  const history = useHistory();
  const FIRST_LETTER = 'first-letter';
  const ALERT_NOTFOUND = 'Sorry, we haven\'t found any recipes for these filters.';
  console.log(search);

  const SearchFoods = async () => {
    if (radioSearch === 'ingredient') {
      const result = await getFoodByIngredient(searchInput);
      if (result === null) {
        global.alert(ALERT_NOTFOUND);
      } else {
        setSearch(result);
      }
    }
    if (radioSearch === 'name') {
      const result = await getFoodByName(searchInput);
      if (result === null) {
        global.alert(ALERT_NOTFOUND);
      } else if (result.length === 1) {
        history.push(`/foods/${result[0].idMeal}`);
      } else {
        setSearch(result);
      }
    }
    if (radioSearch === FIRST_LETTER && searchInput.length === 1) {
      const result = await getFoodByLetter(searchInput);
      setSearch(result);
    }
    if (radioSearch === FIRST_LETTER && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const SearchDrinks = async () => {
    if (radioSearch === 'ingredient') {
      const result = await getDrinkByIngredient(searchInput);
      if (result === null) {
        global.alert(ALERT_NOTFOUND);
      } else {
        setSearch(result);
      }
    }
    if (radioSearch === 'name') {
      const result = await getDrinkByName(searchInput);
      if (result === null) {
        global.alert(ALERT_NOTFOUND);
      } else if (result.length === 1) {
        history.push(`/drinks/${result[0].idDrink}`);
      } else {
        setSearch(result);
      }
    }
    if (radioSearch === FIRST_LETTER && searchInput.length === 1) {
      const result = await getDrinkByLetter(searchInput);
      setSearch(result);
    }
    if (radioSearch === FIRST_LETTER && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const btnSearch = () => {
    if (location.pathname === '/foods') {
      const foodResults = SearchFoods();
      return foodResults;
    }
    if (location.pathname === '/drinks') {
      const drinkResults = SearchDrinks();
      return drinkResults;
    }
  };

  return (
    <div>
      <label htmlFor="ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
          name="ingredient"
          onChange={ (e) => setRadioSearch(e.target.name) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name"
          name="name"
          onChange={ (e) => setRadioSearch(e.target.name) }
        />
      </label>
      <label htmlFor="first-letter">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter"
          name="first-letter"
          onChange={ (e) => setRadioSearch(e.target.name) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => btnSearch() }
      >
        Search
      </button>
    </div>
  );
};

HeaderSearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
};

export default HeaderSearchBar;
