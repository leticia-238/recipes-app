import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import AppContext from '../context/AppContext';

const FavoriteRecipes = () => {
  const { favoriteRecipes } = useContext(AppContext);
  return (
    <div>
      <Header
        title="Favorite Recipes"
        searchButton={ false }
      />
      <RecipesList recipes={ favoriteRecipes } />
    </div>
  );
};

export default FavoriteRecipes;
