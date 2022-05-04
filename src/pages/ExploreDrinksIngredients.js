import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getAllIngredients } from '../utils/apiData';

const ExploreDrinksIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const MAX_INGREDIENTS = 12;

  useEffect(() => {
    const getIngredients = async (type) => {
      const data = await getAllIngredients(type);

      setIngredients(data.drinks.slice(0, MAX_INGREDIENTS));
    };
    getIngredients('drinks');
  }, []);

  return (
    <div>
      <Header
        title="Explore Ingredients"
        searchButton={ false }
      />
      <Footer />
      <div className="foods-igredients">
        <ul>
          {
            ingredients.map(({ strIngredient1 }, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-card` }>
                <img data-testid={ `${index}-card-img` } src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` } alt="" />
                <span data-testid={ `${index}-card-name` }>{strIngredient1}</span>
              </li>))
          }
        </ul>
      </div>
    </div>
  );
};

export default ExploreDrinksIngredients;
