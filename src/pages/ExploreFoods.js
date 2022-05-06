import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomRecipe } from '../utils/apiData';

const ExploreFoods = () => {
  const history = useHistory();

  const ingredientsPath = 'foods/ingredients';
  const nationalitiesPath = 'foods/nationalities';

  const surpriseFood = async () => {
    const recipe = await fetchRandomRecipe('meals');
    const id = recipe[0].idMeal;
    history.push(`/foods/${id}`);
  };
  return (
    <div>
      <Header
        title="Explore Foods"
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
          data-testid="explore-by-nationality"
          onClick={ () => history.push(nationalitiesPath) }
          type="button"
        >
          By Nationality

        </button>

        <button
          onClick={ () => surpriseFood() }
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
export default ExploreFoods;
