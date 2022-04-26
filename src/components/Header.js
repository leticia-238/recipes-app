import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => (
  <header className="header">
    <button type="button">
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profile button" />
    </button>
    <h1 data-testid="page-title">Foods</h1>
    <button type="button">
      <img data-testid="search-top-btn" src={ searchIcon } alt="search button" />
    </button>
  </header>
);

export default Header;
