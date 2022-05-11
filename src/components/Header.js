import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';
import '../styles/FooterHeader.css';

const Header = ({ title, searchButton }) => {
  const { push } = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState(''); // Vi

  return (
    <header className="container header">
      <div className="row">
        <button
          onClick={ () => push('/profile') }
          type="button"
          className="col-2 icon-header"
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile button" />
        </button>
        <h2 data-testid="page-title" className="col-8">{title}</h2>
        {
          searchButton && (
            <button
              onClick={ () => setShowSearchBar(!showSearchBar) }
              type="button"
              className="col-2 icon-header"
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="search button" />
            </button>)
        }

        {
          showSearchBar && (
            <div className="container-fluid container-search">
              <input
                type="text"
                data-testid="search-input"
                placeholder="Search Recipe"
                className="input-search"
                value={ searchInput } // Vi
                onChange={ (e) => setSearchInput(e.target.value) } // Vi
              />
              {/* Vi */}
              <HeaderSearchBar searchInput={ searchInput } />
            </div>
          )
        }
      </div>
    </header>);
};

export default Header;
Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchButton: PropTypes.bool.isRequired,
};
