import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import AppContext from '../context/AppContext';

const DoneRecipes = () => {
  const { doneRecipes } = useContext(AppContext);
  return (
    <div>
      <Header
        title="Done Recipes"
        searchButton={ false }
      />
      <RecipesList recipes={ doneRecipes } />
    </div>
  );
};

export default DoneRecipes;
