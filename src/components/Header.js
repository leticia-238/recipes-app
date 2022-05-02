import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ title, searchButton = true }) => {
  const { push } = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header className="header">
      <button onClick={ () => push('/profile') } type="button">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile button" />
      </button>
      <h1 data-testid="page-title">{title}</h1>
      {
        searchButton && (
          <button onClick={ () => setShowSearchBar(!showSearchBar) } type="button">
            <img data-testid="search-top-btn" src={ searchIcon } alt="search button" />
          </button>)
      }

      {
        showSearchBar && (
          <input type="text" data-testid="search-input" />
        )
      }
    </header>);
};

export default Header;
Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchButton: PropTypes.bool.isRequired,
};
