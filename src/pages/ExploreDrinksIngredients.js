import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getAllIngredients, getDrinkByIngredient } from '../utils/apiData';
import AppContext from '../context/AppContext';

const ExploreDrinksIngredients = () => {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const { setSearch } = useContext(AppContext);
  const MAX_INGREDIENTS = 12;

  useEffect(() => {
    const getIngredients = async (type) => {
      const data = await getAllIngredients(type);

      setIngredients(data.drinks.slice(0, MAX_INGREDIENTS));
    };
    getIngredients('drinks');
  }, []);

  const redirectToDrinksWithIngredients = async (ingredientName) => {
    const result = await getDrinkByIngredient(ingredientName);
    setSearch(result);
    history.push('/foods');
  };

  return (
    <div>
      <Header
        title="Explore Ingredients"
        searchButton={ false }
      />
      <Footer />
      <div className="foods-igredients">
        <ul role="menu">
          {
            ingredients.map(({ strIngredient1 }, index) => (
              <li
                role="menuitem"
                onKeyDown={ () => redirectToDrinksWithIngredients(strIngredient1) }
                onClick={ () => redirectToDrinksWithIngredients(strIngredient1) }
                key={ index }
                data-testid={ `${index}-ingredient-card` }
              >
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
