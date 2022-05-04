import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomRecipe } from '../utils/apiData';

const ExploreDrinks = () => {
  const history = useHistory();
  const ingredientsPath = 'drinks/ingredients';

  const surpriseDrink = async () => {
    const recipe = await fetchRandomRecipe('drinks');
    const id = recipe[0].idDrink;
    history.push(`/drinks/${id}`);
  };
  return (
    <div>
      <Header
        title="Explore Drinks"
        searchButton={ false }
      />
      <section className="explore-buttons">
        <button
          data-testid="explore-by-ingredient"
          onClick={ () => history.push(ingredientsPath) }
          type="button"
        >
          By Ingredient

        </button>

        <button
          onClick={ () => surpriseDrink() }
          data-testid="explore-surprise"
          type="button"
        >
          Surprise me!

        </button>
      </section>
      <Footer />

    </div>
  );
};

export default ExploreDrinks;
