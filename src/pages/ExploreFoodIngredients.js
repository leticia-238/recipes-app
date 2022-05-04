import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ExploreFoodIngredients = () => {
  const getRecipes = async () => {

  };
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <Header
        title="Explore Ingredients"
        searchButton={ false }
      />
      <Footer />
    </div>
  );
};

export default ExploreFoodIngredients;
