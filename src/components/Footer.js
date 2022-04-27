import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => {
  const history = useHistory();

  return (
    <footer data-testid="footer" className="footer">
      <button type="button" onClick={ () => history.push('/drinks') }>
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink button" />
      </button>
      <button type="button" onClick={ () => history.push('/explore') }>
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore button" />
      </button>
      <button type="button" onClick={ () => history.push('/foods') }>
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal button" />
      </button>
    </footer>
  );
};

export default Footer;
