import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CardRecipes from '../components/CardsRecipe';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import { getFoodsNationalityList, getFoodsByNationality } from '../utils/apiData';

const ExploreNationalities = () => {
  const [nationalities, setNationalities] = useState([]);
  const [nationality, setNationality] = useState('All');
  const [filteredMeals, setFilteredMeals] = useState([]);
  const { mealsAndDrinksData: { meals } } = useContext(AppContext);
  const history = useHistory();

  const MAX_RECIPES = 12;

  useEffect(() => {
    const getNationalities = async () => {
      const data = await getFoodsNationalityList();
      setNationalities(data);
    };
    getNationalities();
  }, []);

  const handleChange = async ({ target }) => {
    if (target.value === 'All') {
      setNationality(target.value);
      setFilteredMeals(meals);
    } else {
      setNationality(target.value);
      const result = await getFoodsByNationality(target.value);
      setFilteredMeals(result);
    }
  };

  const handleClick = (id) => {
    history.push(`/foods/${id}`);
  };

  return (
    <div>
      {/* {console.log(nationality)} */}
      {/* {console.log(meals)}
      {console.log(filteredMeals)} */}
      <Header
        title="Explore Nationalities"
        searchButton
      />
      <div>
        <select
          data-testid="explore-by-nationality-dropdown"
          value={ nationality }
          onChange={ handleChange }
        >
          <option data-testid="All-option">All</option>
          {nationalities.map((option) => (
            <option
              key={ option.strArea }
              data-testid={ `${option.strArea}-option` }
            >
              { option.strArea }
            </option>
          ))}
        </select>
      </div>
      <div>
        { nationality === 'All'
          ? (
            [...meals].slice(0, MAX_RECIPES).map((item, index) => (
              <div
                key={ index }
                onClick={ () => handleClick(item.idMeal) }
                aria-hidden="true"
              >
                <CardRecipes
                  key={ index }
                  recipe={ item }
                  index={ index }
                />
              </div>
            ))
          )
          : (
            [...filteredMeals].slice(0, MAX_RECIPES).map((item, index) => (
              <Link to={ `/foods/${item.idMeal}` } key={ index }>
                <CardRecipes
                  key={ index }
                  recipe={ item }
                  index={ index }
                />
              </Link>
            ))
          )}
      </div>
      <Footer />
    </div>
  );
};

export default ExploreNationalities;

// https://www.codegrepper.com/code-examples/javascript/react+onClick+to+div
// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/112261cbc84f5b7d74de9b427b529a10b41faece/docs/rules/no-static-element-interactions.md
