import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/FooterHeader.css';

const Footer = () => {
  const history = useHistory();

  return (
    <footer
      data-testid="footer"
      // style={ { bottom: '0', position: 'fixed' } }
      className="footer container mx-auto py-2"
    >
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
        className="icon-footer"
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink button" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore') }
        className="icon-footer"
      >
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore button" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
        className="icon-footer"
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal button" />
      </button>
    </footer>
  );
};

export default Footer;
