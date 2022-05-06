import React, { useContext, useEffect, useState } from 'react';
import CardRecipes from '../components/CardsRecipe';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import { getFoodsNationalityList } from '../utils/apiData';

const ExploreNationalities = () => {
  const [nationalities, setNationalities] = useState([]);
  const [nationality, setNationality] = useState('All');
  const { meals } = useContext(AppContext);

  const MAX_RECIPES = 12;

  useEffect(() => {
    const getNationalities = async () => {
      const data = await getFoodsNationalityList();
      setNationalities(data);
    };
    getNationalities();
  }, []);

  // p/ All = https://www.themealdb.com/api/json/v1/1/search.php?s=
  // p/ d+ options = https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}

  return (
    // strArea
    <div>
      {/* {console.log(nationality)} */}
      {console.log(meals)}
      <Header
        title="Explore Nationalities"
      />
      <div>
        <select
          data-testid="explore-by-nationality-dropdown"
          value={ nationality }
          onChange={ (event) => setNationality(event.target.value) }
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
        {/* { nationality === 'All'
          && (
            meals.slice(0, MAX_RECIPES).map((item, index) => (
              <CardRecipes key={ index } recipe={ item } index={ index } />
            ))
          )} */}
        {/* search.slice(0, MAX_RECIPES).map((item, index) => (
              <CardRecipes key={ index } recipe={ item } index={ index } />
            )) */}
      </div>
      <Footer />
    </div>
  );
};

export default ExploreNationalities;
