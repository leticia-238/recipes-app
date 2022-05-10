import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getAllIngredients, getFoodByIngredient } from '../utils/apiData';
import AppContext from '../context/AppContext';

const ExploreFoodIngredients = () => {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const { setSearch } = useContext(AppContext);
  const MAX_INGREDIENTS = 12;

  useEffect(() => {
    const getIngredients = async (type) => {
      const data = await getAllIngredients(type);
      setIngredients(data.meals.slice(0, MAX_INGREDIENTS));
    };
    getIngredients('meals');
  }, []);

  const redirectToFoodsWithIngredients = async (ingredientName) => {
    const result = await getFoodByIngredient(ingredientName);
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
            ingredients.map(({ strIngredient }, index) => (
              <li
                role="menuitem"
                onKeyDown={ () => redirectToFoodsWithIngredients(strIngredient) }
                onClick={ () => redirectToFoodsWithIngredients(strIngredient) }
                key={ index }
                data-testid={ `${index}-ingredient-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt=""
                />
                <span data-testid={ `${index}-card-name` }>{strIngredient}</span>
              </li>))
          }
        </ul>
      </div>
    </div>
  );
};

export default ExploreFoodIngredients;
