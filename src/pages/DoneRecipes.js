import React from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

const DoneRecipes = () => (
  <div>
    <Header
      title="Done Recipes"
      searchButton={ false }
    />
    <RecipesList />
  </div>
);

export default DoneRecipes;
