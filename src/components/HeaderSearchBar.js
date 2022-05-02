import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getFoodByIngredient, getFoodByName, getFoodByLetter,
  getDrinkByIngredient, getDrinkByName, getDrinkByLetter } from '../utils/apiData';

const HeaderSearchBar = ({ searchInput }) => {
  const [radioSearch, setRadioSearch] = useState('');
  const FIRST_LETTER = 'first-letter';
  const location = useLocation();

  // pegar dados do input search
  const SearchFoods = async () => {
    if (radioSearch === 'ingredient') {
      const result = getFoodByIngredient(searchInput);
      return result;
    }
    if (radioSearch === 'name') {
      const result = getFoodByName(searchInput);
      return result;
    }
    if (radioSearch === FIRST_LETTER && searchInput.length === 1) {
      const result = getFoodByLetter(searchInput);
      return result;
    }
    if (radioSearch === FIRST_LETTER && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const SearchDrinks = async () => {
    if (radioSearch === 'ingredient') {
      const result = getDrinkByIngredient(searchInput);
      return result;
    }
    if (radioSearch === 'name') {
      const result = getDrinkByName(searchInput);
      return result;
    }
    if (radioSearch === FIRST_LETTER && searchInput.length === 1) {
      const result = getDrinkByLetter(searchInput);
      return result;
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
      {/* {console.log(radioSearch)} */}
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
